import { Link } from "react-router-dom";
const PageNotFound = ({type}) => {
  return (
    <div className="ui placeholder segment">
      <div className="ui icon header">
        <i className="search icon"></i>
        We don't have any {type} matching your query
      </div>
      <div className="inline">
        <Link to={'/'} className="ui black button">Home</Link>
      </div>
    </div>
  );
};

export default PageNotFound;