const Articles = ({ article }) => {
  const myDate = new Date(article.created_at);
  const day = myDate.getDate();
  const month = myDate.toLocaleString("default", { month: "long" });
  const year = myDate.getFullYear();
  const date = `${day}/${month}/${year}`;
  return (
    <div className="ui card">
      <div className="image">
        <img src={article.article_img_url} />
      </div>
      <div className="content">
        <a className="header">{article.title}</a>
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
    </div>
  );
};

export default Articles;