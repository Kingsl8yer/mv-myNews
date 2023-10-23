import news1 from "../assets/news1.png";

const Header = () => {
  return (
    <header className="ui header">
      <div className="ui inverted large menu">
        <div className="ui inverted segment center aligned item">
          <h1 className="ui  header">
            <img className="ui circular image" src={news1} />
            <div className="content centered">NC News</div>
          </h1>
        </div>
        <a className="item">Topics</a>
        <a className="item">Articles</a>

        <div className="right menu">
          <a className="item">Users</a>
          <a className="item">Sign in</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
