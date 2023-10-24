import news1 from "../assets/news1.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="ui header">
      <div className="ui inverted large menu">
        <Link to="/" className="ui inverted segment center aligned item">
          <h1 className="ui  header">
            <img className="ui circular image" src={news1} />
            <div className="content centered">NC News</div>
          </h1>
        </Link>
        <a className="item">Topics</a>
        <Link to="/articles" className="item">Articles</Link>

        <div className="right menu">
          <a className="item">Users</a>
          <a className="item">Sign in</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
