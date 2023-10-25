import { fetchArticles } from "../api.js";
import Articles from "./Articles.jsx";
import { useState, useEffect } from "react";
import Loading from "./Loading.jsx";
import { useSearchParams } from "react-router-dom";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortAttributes, setSortAttributes] = useState([]);
  const [order, setOrder] = useState(true);
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
  $(document).ready(function() {
    $('.ui.dropdown').dropdown();
  });
  useEffect(() => {
    
    fetchArticles(filterByTopic, sortBy, orderBy).then((data) => {
      setArticles(data.articles);
      setSortAttributes(["created_at", "votes", "comment_count"]);
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
            <div className="menu">
              {sortAttributes.map((sortAttribute, index) => {
                return (
                  <div
                    className="item"
                    key={index}
                    onClick={() => {
                      setSortByParams(sortAttribute);
                    }}
                  >
                    {sortAttribute === "created_at" ? "Date (default)" : sortAttribute === "votes" ? "Votes" : "Comments"}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="item">
            <i
              className={
                order ? "sort amount down icon" : "sort amount up icon"
              }
              onClick={() => {
                setOrder(!order);
                setOrderParams(order ? "desc" : "asc");
              }}
            ></i>
            
          </div>
          
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
