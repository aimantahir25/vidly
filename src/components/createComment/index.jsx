import React, { useState } from "react";
import { db } from "../../firebase";
import "./style.css";

const CreateComment = ({ id, user, comments }) => {
  const [comment, setComment] = useState("");
  // const [allComments, setAllComments] = useState(comments ? comments : []);
  const allComments = comments ? comments : [];

  const postComment = () => {
    if (comment !== "") {
      allComments.push({
        id: user.uid + Date.now(),
        comment: comment,
        username: user.displayName,
      });
      db.collection("posts")
        .doc(id)
        .update({
          comments: allComments,
        })
        .then(() => setComment(""))
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="createComment">
      <textarea
        className="createComment__text"
        rows="1"
        cols="100"
        placeholder="Write Your Comment ..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="createComment__btn" onClick={postComment}>
        
        Post
      </button>
    </div>
  );
};

export default CreateComment;
