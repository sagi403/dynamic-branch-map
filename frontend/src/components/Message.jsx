import PropTypes from "prop-types";

const Message = ({ message, color }) => {
  return (
    <div role="alert">
      <div
        className={`border border-${color}-400 rounded bg-${color}-100 px-4 py-3 text-${color}-700`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

Message.defaultProps = {
  message: "An error occurred. Please try again later.",
  color: "red",
};

Message.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string,
};

export default Message;
