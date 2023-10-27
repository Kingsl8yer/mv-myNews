const Modal = ({ name, body }) => {
  return (
    <div className="ui small modal">
      <div className="ui success message">
        <div className="header">{name}</div>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default Modal;
