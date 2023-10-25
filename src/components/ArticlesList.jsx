import { fetchArticles } from "../api.js";
import Articles from "./Articles.jsx";
import { useState, useEffect } from "react";
import Loading from "./Loading.jsx";
import {useSearchParams} from "react-router-dom";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterByTopic = searchParams.get('topic');

  useEffect(() => {
      fetchArticles(filterByTopic).then((data) => {
      setArticles(data.articles);
      setIsLoading(false);
    });
  }
  , [filterByTopic]);

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
