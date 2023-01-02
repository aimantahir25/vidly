import React, { useContext } from "react";
import { UserContext } from "../../context/useUser";
import { storage, db } from "../../firebase";
import { Comment, CreateComment } from "../../components";
import "./style.css";

export default function Post({
  userName,
  userEmail,
  userPhoto,
  userPostText,
  postPhoto,
  postComments,
  postDateTime,
  postId,
}) {

  let postAdmin = false;
  const { user } = useContext(UserContext).user;
  if (user) {
    postAdmin = user.email === userEmail ? true : false;
  }

  const deletePost = () => {
    if (postPhoto) {
      const imgRef = storage.refFromURL(postPhoto);
      imgRef
        .delete()
        .then(() => {
          // console.log("Successfully deleted from storage")
        })
        .catch(() => {
          // console.log("Error deleting post from storage")
        });
    }

    db.collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        // console.log("Successfully deleted from db")
      })
      .catch(() => {
        // console.log("Error deleting post from db")
      });
  };

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__user">
          <img src={userPhoto} alt="user" className="post__userImg" />
          <div className="post__userName">
            <h3> {userName} </h3>
            <p> {userEmail} </p>
          </div>
        </div>
        {postAdmin && (
          <button className="post__deleteOption" onClick={deletePost}>
            Delete
          </button>
        )}
      </div>
      <div className="post__body">
        {postPhoto && (
          <img src={postPhoto} alt="post" className="post__photo" />
        )}
        <p className="post__text">{userPostText}</p>
        <p className="post__time"> {postDateTime.toDate().toString()} </p>

        <div className="post__comments">
          {postComments &&
            postComments.map((c) => (
              <Comment key={c.id} username={c.username} comment={c.comment} />
            ))}
        </div>

        {user && <CreateComment id={postId} user={user} comments={postComments} />}
      </div>
    </div>
  );
}
