import { User } from "../../hooks/useUser";

interface Props {
  shopImage: string;
  productsCount: number;
  seller: User;
  visits: number;
}

const Stats = ({ productsCount, seller, shopImage, visits }: Props) => {
  const { avatar } = seller;

  return (
    <section className="stats shadow">
      <article className="stat">
        <div className="stat-figure text-primary hidden sm:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <h2 className="stat-title">Products</h2>
        <p className="stat-value text-primary">{productsCount}</p>
        <p className="stat-desc hidden sm:block">Coming Soon</p>
      </article>

      <article className="stat">
        <div className="stat-figure text-secondary hidden sm:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <h2 className="stat-title">Shop Visits</h2>
        <p className="stat-value text-secondary">{visits}</p>
        <p className="stat-desc hidden sm:block">21% more than last month</p>
      </article>

      <article className="stat">
        <div className="stat-figure text-secondary hidden sm:block">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <img src={avatar || shopImage} alt="Avatar" />
            </div>
          </div>
        </div>
        <p className="stat-value">86%</p>
        <h2 className="stat-title">Tasks done</h2>
        <p className="stat-desc text-secondary hidden sm:block">
          31 tasks remaining
        </p>
      </article>
    </section>
  );
};

export default Stats;
