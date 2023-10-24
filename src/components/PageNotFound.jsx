const PageNotFound = () => {
  return (
    <div className="ui placeholder segment">
      <div className="ui icon header">
        <i className="search icon"></i>
        We don't have any news matching your query
      </div>
      <div className="inline">
        <div className="ui primary button">Home</div>
      </div>
    </div>
  );
};

export default PageNotFound;