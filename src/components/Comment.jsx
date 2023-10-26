const Comment = ({ comment, username, deleteButton, handleDelete }) => {
    return (
    <div className="ui  segment">
      <h3 className="ui right aligned disabled header">
        #{comment.comment_id}
      </h3>
      <div className="ui padded raised segment">
        <h4 className="ui header">
          <i className="user circle icon"></i>
          {comment.author}:
        </h4>
        <p>{comment.body}</p>
      </div>
      <button className="ui green basic  button">
        <i className="thumbs up outline icon"></i>
        {comment.votes} likes
      </button>
      <button className="ui red basic  button">
        <i className="thumbs down outline icon"></i>
      </button>
      {deleteButton ? (
                <button className="ui red right floated button"
                onClick={()=>{handleDelete(comment.comment_id)}}
                >
                    <i className="trash alternate outline icon"></i>
                    Delete
                </button>
            ) : (
                <></>
            )}
    </div>
  );
};
export default Comment;
