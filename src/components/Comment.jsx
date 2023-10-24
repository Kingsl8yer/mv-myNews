const Comment = ({ comment }) => {
    return (
        <div className="ui attached segment">
        <div className="ui padded segment">
            <h4 className="ui header">{comment.username}</h4>
            <p>{comment.body}</p>
        </div>
        <button className="ui green basic  button"><i className="thumbs up outline icon"></i>
            {comment.votes} likes</button>
        <button className="ui red basic  button"><i className="thumbs down outline icon"></i></button>
        </div>
    )
    }
    export default Comment;