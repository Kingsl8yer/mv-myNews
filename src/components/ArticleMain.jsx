import { useState, useEffect } from "react";
import { fetchArticleById } from "../api.js";
import { useParams } from "react-router-dom";

const ArticleMain = () => {
    const [article, setArticle] = useState({});
    const { article_id } = useParams();

    useEffect(() => {
        fetchArticleById(article_id).then((data) => {
            setArticle(data.article);
        });
    }
    , [article_id]);


  const myDate = new Date(article.created_at);
  const day = myDate.getDate();
  const month = myDate.toLocaleString("default", { month: "long" });
  const year = myDate.getFullYear();
  const date = `${day}/${month}/${year}`;
  return (
    <div style={{ margin: "auto", width: "50%" , paddingBottom: "10px"}}>
    <div className="ui segment">
      <h1 className="ui centered huge header">{article.title}</h1>
      <div className="image centered">
        <img className="ui centered huge image" src={article.article_img_url} />
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
    <button className="ui green basic button"><i className="thumbs up outline icon"></i>
            {article.votes} likes</button>
    <button className="ui red basic button"><i className="thumbs down outline icon"></i></button>
    <button className="ui blue basic button"><i className="comment outline icon"></i>
                    {article.comment_count} comments</button>
    </div>
  );
};
export default ArticleMain;
