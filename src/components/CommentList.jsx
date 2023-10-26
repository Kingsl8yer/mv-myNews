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
import Loading from "./Loading";

const CommentList = ({ username }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorComment, setErrorComment] = useState(false);
  const [disable, setDisable] = useState(false);
  const { article_id } = useParams();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = {
      username: username,
      body: commentText,
    };
    postCommentByArticleId(article_id, comment)
      .then((data) => {
        setComments((currComments) => {
          return [data, ...currComments];
        });
      })
      .catch((err) => {
        setErrorComment(true);
        setIsLoading(false);
      })
      .then(() => {
        setCommentText("");
        if (!errorComment) {
          setDisable(true);
        }
        setTimeout(() => {
          setErrorComment(false);
          setDisable(false);
        }, 3000);
      });
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
    }, 2500);
  };

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((data) => {
      setComments(data.comments);
      setErrorComment(false);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) return <Loading />;

  return (
    <div style={{ margin: "auto", padding: "10px" }}>
      <form
        className={
          errorComment
            ? "ui form error"
            : disable
            ? "ui form success"
            : "ui form"
        }
        onSubmit={handleSubmit}
      >
        <div className={disable||errorComment ? "disabled field" : "field"}>
          <label>New Comment:</label>
          <textarea
            rows="3"
            value={commentText}
            onChange={(event) => {
              setCommentText(event.target.value);
            }}
          />
        </div>

        <SuccessMessage
          name={username}
          successful={false}
          headerMessage={"Comment failed!"}
          body={`Sorry ${username}, some data was missing!`}
        />

        <SuccessMessage
          name={username}
          successful={true}
          headerMessage={"Comment Submitted"}
          body={`Thank you, ${username}! Just wait a fe seconds before commenting
        again please!`}
        />
        <button className="ui button blue" type="submit">
          Submit
        </button>
      </form>
      <Modal
        name={username}
        body={"Your comment has been deleted successfully!"}
      />
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
