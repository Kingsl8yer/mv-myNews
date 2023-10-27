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
  const [errorCommentPost, setErrorCommentPost] = useState(false);
  const [errorCommentDelete, setErrorCommentDelete] = useState(false);
  const [errorCommentFetch, setErrorCommentFetch] = useState(false);
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
        setErrorCommentPost(false);
        setErrorCommentDelete(false);
        setErrorCommentFetch(false);
        setIsLoading(false);
        setComments((currComments) => {
          return [data, ...currComments];
        });
      })
      .then(() => {
        setCommentText("");
        if (!errorCommentPost) {
          setDisable(true);
        }
        setTimeout(() => {
          setErrorCommentPost(false);
          setDisable(false);
        }, 3000);
      })
      .catch((err) => {
        setErrorCommentDelete(true);
        setIsLoading(false);
      });
  };

  const handleDelete = (comment_id) => {
    deleteCommentById(comment_id)
      .then((data) => {
        setErrorCommentPost(false);
        setErrorCommentDelete(false);
        setErrorCommentFetch(false);
        setIsLoading(false);
        setComments((currComments) => {
          return currComments.filter((comment) => {
            return comment.comment_id !== comment_id;
          });
        });
      })
      .then(() => {
        $(".small.modal").modal("show");

        setTimeout(() => {
          $(".small.modal").modal("hide");
        }, 2500);
      })
      .catch((err) => {
        setErrorCommentDelete(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCommentsByArticleId(article_id)
      .then((data) => {
        setComments(data.comments);
        setErrorCommentPost(false);
        setErrorCommentDelete(false);
        setErrorCommentFetch(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorCommentFetch(true);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <Loading />;
  if (errorCommentFetch)
    return (
      <SuccessMessage
        successful={false}
        headerMessage={"We couldn't load the comments!"}
        body={`Sorry ${username}, an error occurred while loading the comments. Please try again later."`}
      />
    );

  return (
    <div style={{ margin: "auto", padding: "10px" }}>
      <form
        className={
          errorCommentPost
            ? "ui form error"
            : disable
            ? "ui form success"
            : "ui form"
        }
        onSubmit={handleSubmit}
      >
        <div
          className={disable || errorCommentPost ? "disabled field" : "field"}
        >
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
          successful={false}
          headerMessage={"Comment failed!"}
          body={`Sorry ${username}, an error occurred while inserting your comment. Please try again later."`}
        />

        <SuccessMessage
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
      {errorCommentDelete ? (
        <SuccessMessage
          successful={false}
          headerMessage={"Delete comment failed!"}
          body={`Sorry ${username}, an error occurred while deleting your comment. Please try again later."`}
        />
      ) : (
        <></>
      )}
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
