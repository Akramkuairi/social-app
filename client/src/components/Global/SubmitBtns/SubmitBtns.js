import "./SubmitBtns.css";

export const SubmitBtns = (props) => {
  return (
    <div className="SubmitBtns">
      <button className="submit" onClick={() => props.submit()}>
        submit
      </button>
      <button className="cancel" onClick={() => props.cancel()}>
        cancel
      </button>
    </div>
  );
};
