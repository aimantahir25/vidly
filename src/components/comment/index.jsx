import React from "react";
import "./style.css";

const Comment = ({ username, comment }) => {
  return (
    <p className="comment">
      <span className="comment__user"> {username} </span> {comment}{" "}
    </p>
  );
};

export default Comment;
