import { fetchArticles } from "../api.js";
import Articles from "./Articles.jsx";
import { useState, useEffect } from "react";
import Loading from "./Loading.jsx";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then((data) => {
      setArticles(data.articles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="ui three stackable link cards">
      {articles.map((article) => {
        return <Articles key={article.article_id} article={article} />;
      })}
    </div>
  );
};

export default ArticlesList;
