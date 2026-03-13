"use client";
import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const home = pathname === "/";
  const catalog = pathname === "/catalog";

  return (
    <header className={`container ${css.headerContainer}`}>
      <Link className={css.logo} href="/" aria-label="Home">
        <svg width="104" height="16">
          <use href="/sprite.svg#icon-Logo" />
        </svg>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link
              href="/"
              className={clsx(css.navItem, { [css.active]: home })}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/catalog"
              className={clsx(css.navItem, { [css.active]: catalog })}
            >
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
