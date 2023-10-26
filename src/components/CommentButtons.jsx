const CommentButtons = ({comment, deleteButton, handleDelete}) => {
 return (
    <>
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
    </>
 )
}

export default CommentButtons;