import {fetchArticles} from "../api.js";
import Articles from "./Articles.jsx";
import {useState, useEffect} from "react";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((data) => {
      setArticles(data.articles);
    });
  }, []);

  return (
    <div className="ui three stackable link cards">
        {articles.map((article) => {
            return <Articles key={article.article_id} article={article} />;
        }
        )}
    </div>
  );
}

export default ArticlesList;