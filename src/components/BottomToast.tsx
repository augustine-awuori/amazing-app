interface Props {
  type: "success" | "info" | "error";
}

const BottomToast = ({ type }: Props) => (
  <article className="toast toast-start toast-middle">
    <article className={`alert alert-${type}`}>
      <span>URL copied to clipboard!</span>
    </article>
  </article>
);

export default BottomToast;
