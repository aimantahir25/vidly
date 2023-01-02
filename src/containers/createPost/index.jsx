import React, { useContext, useState } from "react";
import { SignInBtn } from "../../components";
import { UserContext } from "../../context/useUser";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { storage, db } from "../../firebase";
import firebase from "firebase";
import "./style.css";

const CreatePost = () => {
  const { user } = useContext(UserContext).user;
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleImage = (e) => {
    if (e.target.files[0]) {
      const maxAllowedSize = 1 * 1024 * 1024;
      if (e.target.files[0].size < maxAllowedSize) {
        setImage(e.target.files[0]);
        const imageSrc = URL.createObjectURL(e.target.files[0]);
        const imagePreview = document.getElementById("preview");
        imagePreview.src = imageSrc;
        imagePreview.style.display = "block";
      } else {
        alert("Image Size Should be Less than 1 MB");
      }
    }
  };

  const handlePost = () => {
    if (image) {
      const imageName = user.uid + Date.now();
      const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);

      uploadTask.on(
        "state_change",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => {
          console.log("Some Error Ocuured while Posting");
        },
        () => {
          storage
            .ref("images")
            .child(`${imageName}.jpg`)
            .getDownloadURL()
            .then((imageUrl) => {
              db.collection("posts").add({
                text: postText,
                image: imageUrl,
                userName: user.displayName,
                userEmail: user.email,
                userImage: user.photoURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
        }
      );
    } else {
      db.collection("posts").add({
        text: postText,
        userName: user.displayName,
        userEmail: user.email,
        userImage: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    const imagePreview = document.getElementById("preview");
    imagePreview.style.display = "none";
    console.log(imagePreview.src);
    setProgress(0);
    setPostText("");
  };

  const loggedIn = (
    <div className="createPost__loggedIn">
      <h3>Create a Post</h3>
      <div className="createPost__box">
        <textarea
          rows="1"
          cols="100"
          className="postText"
          value={postText}
          placeholder="Write Something ..."
          onChange={(e) => setPostText(e.target.value)}
        />
        <div className="imagePreview">
          <img id="preview" src="" alt="selected" />
        </div>
      </div>
      <div className="createPost__options">
        <div className="postImageUpload">
          <label htmlFor="image">
            <AddAPhotoIcon className="addImage" />
          </label>
          <input
            id="image"
            hidden
            type="file"
            accept="image/*"
            onChange={handleImage}
          />
        </div>
        <div>
          { (progress !== 0 && progress !==100 ) ? progress + "%": "" }
          <button
            className={postText ? "canPostIt" : "cantPostIt"}
            disabled={postText ? false : true}
            onClick={handlePost}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );

  const noUser = (
    <div className="createPost__noUser">
      <SignInBtn /> <p style={{ marginLeft: "1rem" }}>to Post and Comment</p>
    </div>
  );

  return <div className="createPost">{user ? loggedIn : noUser}</div>;
};

export default CreatePost;
