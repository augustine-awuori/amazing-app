interface Props {
  message?: string;
  type: "success" | "info" | "error";
}

const BottomToast = ({ message, type }: Props) => (
  <article className="toast toast-start toast-middle">
    <article className={`alert alert-${type}`}>
      <span>{message || "URL copied to clipboard!"}</span>
    </article>
  </article>
);

export default BottomToast;
