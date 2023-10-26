import CommentButtons from "./CommentButtons";

const Comment = ({ comment, deleteButton, handleDelete }) => {
  const myDate = new Date(comment.created_at);
  const day = myDate.getDate();
  const month = myDate.toLocaleString("default", { month: "long" });
  const year = myDate.getFullYear();
  const date = `${day}/${month}/${year}`;
  return (
    <div className="ui raised segment">
      <div className="ui padded  segment">
        <h4 className="ui left floated header">
          <i className="user circle icon"></i>
          <div className="content">
            {comment.author}<div className="sub header">{date}</div>
          </div>
        </h4>
        <h3 className="ui right floated disabled header">
        #{comment.comment_id}
      </h3>
      <div className="ui clearing divider"></div>
        <p>{comment.body}</p>
      </div>
      <CommentButtons
        comment={comment}
        deleteButton={deleteButton}
        handleDelete={handleDelete}
      />
    </div>
  );
};
export default Comment;
