import css from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={`container ${css.hero}`}>
      <div className={css.content}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.description}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link className={css.buttonHerro} href="/catalog">
          View Catalog
        </Link>
      </div>
    </section>
  );
}
