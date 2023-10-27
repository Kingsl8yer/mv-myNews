import news1 from "../assets/news1.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTopics } from "../api.js";
import SuccessMessage from "./SuccessMessage";

const Header = () => {
  const [topics, setTopics] = useState([]);
  const [errorFetchTopics, setErrorFetchTopics] = useState(false);

  useEffect(() => {
    fetchTopics()
      .then((topics) => {
        setErrorFetchTopics(false);
        setTopics(topics.topics);
      })
      .then(() => {
        $(document).ready(function () {
          $(".ui.dropdown").dropdown();
        });
      })
      .catch((err) => {
        setErrorFetchTopics(true);
      });
  }, []);

  return (
    <header className="ui header">
      <div className="ui inverted large menu">
        <Link to="/" className="ui inverted segment center aligned item">
          <h1 className="ui  header">
            <img className="ui circular image" src={news1} />
            <div className="content centered">NC News</div>
          </h1>
        </Link>
        <div className="ui pointing dropdown link item">
          <span className="text">Topics</span>
          <i className="dropdown icon"></i>
          <div className="menu">
            <Link to={`/articles`} className="item">
              Topics
            </Link>
            {topics.map((topic) => {
              return (
                <Link
                  to={`/articles?topic=${topic.slug}`}
                  className="item"
                  key={topic.slug}
                >
                  {topic.slug === "coding"
                    ? "Coding"
                    : topic.slug === "cooking"
                    ? "Cooking"
                    : "Football"}
                </Link>
              );
            })}
          </div>
        </div>
        <Link to="/articles" className="item">
          Articles
        </Link>

        <div className="right menu">
          <a className="item">Users</a>
          <a className="item">
            Sign in
            <i className="sign in alternate icon"></i>
          </a>
        </div>
      </div>
      {errorFetchTopics ? (
        <SuccessMessage
          successful={false}
          headerMessage={"We couldn't load the topics!"}
          body={`Sorry , an error occurred while loading the topics. Please try again later."`}
        />
      ) : (
        <></>
      )}
    </header>
  );
};

export default Header;
