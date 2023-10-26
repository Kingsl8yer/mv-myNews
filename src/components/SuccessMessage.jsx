const SuccessMessage = ({name}) => {
    return (
        <div className="ui success message">
          <div className="header">Comment Submitted</div>
          <p>
            Thank you, {name}! Just wait a fe seconds before commenting
            again please
          </p>
        </div>
    )
}

export default SuccessMessage;