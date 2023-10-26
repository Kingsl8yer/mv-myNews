import { useEffect, useState } from "react";
import {
  fetchCommentsByArticleId,
  postCommentByArticleId,
  deleteCommentById,
} from "../api";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import Modal from "./Modal";
import SuccessMessage from "./SuccessMessage";

const CommentList = ({ username }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [disable, setDisable] = useState(false);
  const { article_id } = useParams();

  $(".message .close").on("click", function () {
    $(this).closest(".message").transition("fade");
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = {
      username: username,
      body: commentText,
    };
    postCommentByArticleId(article_id, comment).then((data) => {
      setComments((currComments) => {
        return [data, ...currComments];
      });
    });
    setCommentText("");
    setDisable(true);
    setTimeout(() => {
      setDisable(false);
    }, 3000);
  };

  const handleDelete = (comment_id) => {
    deleteCommentById(comment_id).then((data) => {
      setComments((currComments) => {
        return currComments.filter((comment) => {
          return comment.comment_id !== comment_id;
        });
      });
    });
    $(".small.modal").modal("show");
    setTimeout(() => {
      $(".small.modal").modal("hide");
    }, 4000);
   };

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((data) => {
      setComments(data.comments);
    });
  }, [article_id]);

  return (
    <div style={{ margin: "auto", padding: "10px" }}>
      <form
        className={disable ? "ui form success" : "ui form"}
        onSubmit={handleSubmit}
      >
        <div className={disable ? "disabled field" : "field"}>
          <label>New Comment:</label>
          <textarea
            rows="3"
            value={commentText}
            onChange={(event) => {
              setCommentText(event.target.value);
            }}
          />
        </div>
        <SuccessMessage name={username}/>
        <button className="ui button blue" type="submit">
          Submit
        </button>
      </form>
      <Modal name={username} body={"Your comment has been deleted successfully!"}/>
      <h3>Comments:</h3>
      {comments.map((comment, index) => {
        return (
          <Comment
            key={index}
            comment={comment}
            username={username}
            deleteButton={username === comment.author}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};

export default CommentList;
