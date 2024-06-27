interface Props {
  count: number;
  right?: number;
  top?: number;
}

const CountBadge = ({ count, right = 0, top = 0 }: Props) => {
  if (!count) return null;

  return (
    <article
      className={`badge badge-sm badge-secondary badge-outline absolute top-${top} right-${right} translate-x-1/2 -translate-y-1/2`}
    >
      {count}
    </article>
  );
};

export default CountBadge;
