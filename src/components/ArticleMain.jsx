import { useState, useEffect } from "react";
import { fetchArticleById, updateArticleVotes } from "../api.js";
import { useParams } from "react-router-dom";
import Loading from "./Loading.jsx";
import PageNotFound from "./PageNotFound.jsx";
import CommentList from "./CommentList.jsx";

const ArticleMain = ({username}) => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [disable, setDisable] = useState(false);
  const [errorPageId, setErrorPageId] = useState(false);
  const [errorArticleVotes, setErrorArticleVotes] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { article_id } = useParams();


  const handleLikes = (value) => {
    updateArticleVotes(article_id, { inc_votes: value })
      .then((data) => {
        setArticle((currArticle) => {
          setDisable(true);
          return { ...currArticle, votes: currArticle.votes + value };
        });
      })
      .catch((err) => {
        setErrorArticleVotes(true);
      });
  };

  useEffect(() => {
    fetchArticleById(article_id)
      .then((data) => {
        setArticle(data.article);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorPageId(true);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <Loading />;
  if (errorPageId) return <PageNotFound />;

  const myDate = new Date(article.created_at);
  const day = myDate.getDate();
  const month = myDate.toLocaleString("default", { month: "long" });
  const year = myDate.getFullYear();
  const date = `${day}/${month}/${year}`;

  return (
    <div style={{ margin: "auto", width: "50%", paddingBottom: "10px" }}>
      <div className="ui segment">
        <h1 className="ui centered huge header">{article.title}</h1>
        <div className="image centered">
          <img
            className="ui centered huge image"
            src={article.article_img_url}
          />
        </div>
        <div className="content centered">
          <i className="user circle outline icon"></i>
          <a className="header">{article.author}</a>
          <div className="meta">
            <span className="date">Created in: {date}</span>
          </div>
        </div>
        <div className="ui clearing divider"></div>
        <div className="description">
          <p>{article.body}</p>
        </div>
      </div>
      <div className="ui green left labeled button">
        <a className="ui basic label">{article.votes} likes</a>
        <div
          className={
            disable ? "ui green disabled button" : "ui basic green button"
          }
          onClick={() => handleLikes(1)}
        >
          <i className="thumbs up outline icon"></i>
        </div>
      </div>
      <div
        className={
          disable ? "ui red disabled button" : "ui basic red button"
        }
        onClick={() => handleLikes(-1)}
      >
        <i className="thumbs down outline icon"></i>
      </div>
      <button className={showComments ? "ui blue button" : "ui blue basic button"} 
      value={showComments}
      onClick={()=>{setShowComments(!showComments)}}
      >
        <i className="comment outline icon"></i>
        {article.comment_count} comments
      </button>
      {errorArticleVotes ? (
        <div className="ui negative message">
          <i className="bug icon"></i>
          <div className="header">Something went wrong</div>
          <p>Please refresh the page!</p>
        </div>
      ) : (
        <></>
      )}
      {disable ? (
        <div className="ui green message">
          Thank you for voting! <i className="hand peace outline icon"></i>
        </div>
      ) : (
        <></>
      )}
      {showComments ? <CommentList username={username}/> : <></>}
    </div>
  );
};
export default ArticleMain;
