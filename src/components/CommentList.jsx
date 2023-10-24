import { useEffect, useState } from "react";
import { fetchCommentsByArticleId, postCommentByArticleId } from "../api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const CommentList = ({ username }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [disable, setDisable] = useState(false);
  const { article_id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = {
      username: username,
      body: commentText,
    };
    postCommentByArticleId(article_id, comment).then((data) => {
      setComments((currComments) => {
        return [...currComments, data];
      });
    });
    setCommentText("");
    setDisable(true);
    setTimeout(()=>{
        setDisable(false);
    },5000)
  };

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((data) => {
      setComments(data.comments);
    });
  }, [article_id]);

  return (
    <div style={{ margin: "auto", width: "50%", paddingBottom: "10px" }}>
      <Link
        to={`/articles/${article_id}`}
        className="ui labeled basic icon button"
      >
        <i className="left chevron icon"></i>
        Back
      </Link>
      <h3>Comments</h3>
      {comments.map((comment, index) => {
        return <Comment key={index} comment={comment} />;
      })}
      <form className={disable ? "ui form success" : "ui form"} onSubmit={handleSubmit}>
        <div className={disable ? "disabled field" : "field"}>
          <label>New Comment</label>
          <textarea
            rows="3"
            value={commentText}
            onChange={(event) => {
              setCommentText(event.target.value);
            }}
          />
        </div>
        <div className="ui success message">
          <div className="header">Comment Submitted</div>
          <p>Thank you, {username}! Just wait a fe seconds before commenting again please</p>
        </div>
        <button className="ui button blue" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentList;
