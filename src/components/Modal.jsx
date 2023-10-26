const Modal = ({ name, body }) => {
  $(".message .close").on("click", function () {
    $(this).closest(".message").transition("fade");
  });
  return (
    <div className="ui small modal">
      <div className="ui success message">
        <i className="close icon"></i>
        <div className="header">{name}</div>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default Modal;
