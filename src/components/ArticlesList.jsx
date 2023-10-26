import { fetchArticles } from "../api.js";
import Articles from "./Articles.jsx";
import { useState, useEffect } from "react";
import Loading from "./Loading.jsx";
import { useSearchParams } from "react-router-dom";
import ArticleOrder from "./ArticlesOrder.jsx";
import SortByArticles from "./SortByArticles.jsx";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterByTopic = searchParams.get("topic");
  const sortBy = searchParams.get("sort_by");
  const orderBy = searchParams.get("order");

  const setOrderParams = (order) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", order);
    setSearchParams(newParams);
  };

  const setSortByParams = (sortBy) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sortBy);
    setSearchParams(newParams);
  };
  $(document).ready(function () {
    $(".ui.dropdown").dropdown();
  });
  useEffect(() => {
    fetchArticles(filterByTopic, sortBy, orderBy).then((data) => {
      setArticles(data.articles);
      setIsLoading(false);
    });
  }, [filterByTopic, sortBy, orderBy]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="ui top attached menu">
        <div className="right menu">
          <div className="ui right dropdown item">
            <div className="text">Sort By</div>
            <i className="dropdown icon"></i>
            <SortByArticles setSortByParamsFunc={setSortByParams} />
          </div>
          <ArticleOrder setOrderParamsFunc={setOrderParams} />
        </div>
      </div>

      <div className="ui three stackable link cards">
        {articles.map((article) => {
          return <Articles key={article.article_id} article={article} />;
        })}
      </div>
    </>
  );
};

export default ArticlesList;
