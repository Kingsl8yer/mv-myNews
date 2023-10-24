
import { Link } from "react-router-dom";

const Articles = ({ article }) => {
  const myDate = new Date(article.created_at);
  const day = myDate.getDate();
  const month = myDate.toLocaleString("default", { month: "long" });
  const year = myDate.getFullYear();
  const date = `${day}/${month}/${year}`;
  return (

    <Link to={`/articles/${article.article_id}`} className="ui card">
      <div className="image">
        <img src={article.article_img_url} />
      </div>
      <div className="content">
        <header className="header">{article.title}</header>
        <div className="meta">
          <span className="date">{article.topic}</span>
        </div>
      </div>
      <div className="content">
        <span className="right floated">
          <i className="heart outline like icon"></i>
          {article.votes} likes
        </span>
        <i className="comment icon"></i>
        {article.comment_count} comments
      </div>

      <div className="extra content">
        <span className="right floated">
          <i className="calendar alternate outline icon"></i>
          {date}
        </span>
        <span>
          <i className="user circle outline icon"></i>
          {article.author}
        </span>
      </div>
</Link>
  );
};

export default Articles;
