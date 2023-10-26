import news1 from "../assets/news1.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTopics } from "../api.js";

const Header = () => {
  const [topics, setTopics] = useState([]);
  $(document).ready(function () {
    $(".ui.dropdown").dropdown();
  });

  useEffect(() => {
    fetchTopics().then((topics) => {
      setTopics(topics.topics);
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
    </header>
  );
};

export default Header;
