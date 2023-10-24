import { useState, useEffect } from "react";
import { fetchArticleById } from "../api.js";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "./Loading.jsx";
import PageNotFound from "./PageNotFound.jsx";

const ArticleMain = () => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    fetchArticleById(article_id).then((data) => {
      setArticle(data.article);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) return <Loading />;
  if (!article) return <PageNotFound />;

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
      <button className="ui green basic button">
        <i className="thumbs up outline icon"></i>
        {article.votes} likes
      </button>
      <button className="ui red basic button">
        <i className="thumbs down outline icon"></i>
      </button>
      <Link
        to={`/articles/${article_id}/comments`}
        className="ui blue basic button"
      >
        <i className="comment outline icon"></i>
        {article.comment_count} comments
      </Link>
    </div>
  );
};
export default ArticleMain;
