interface Props {
  type: "success" | "info" | "error";
}

const BottomToast = ({ type }: Props) => (
  <div className="toast z-1000">
    <div className={`alert alert-${type}`}>
      <span>URL copied to clipboard!</span>
    </div>
  </div>
);

export default BottomToast;
