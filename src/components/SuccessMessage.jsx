const SuccessMessage = ({body, successful, headerMessage}) => {
    return (
        <div className={successful ? "ui success message" : "ui error message"}>
          <div className="header">{headerMessage}</div>
          <p>
            {body}
          </p>
        </div>
    )
}

export default SuccessMessage;