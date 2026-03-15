"use client";

import css from "./CarList.module.css";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/car";
import { useCarStore } from "@/lib/store/carStore";

interface CarListProps {
  cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
  const favorites = useCarStore((state) => state.favorites);
  const toggleFavorite = useCarStore((state) => state.toggleFavorite);

  return (
    <ul className={css.list}>
      {cars.map((car) => {
        const addressParts = car.address.split(", ");
        const city = addressParts[addressParts.length - 2];
        const country = addressParts[addressParts.length - 1];
        const isFavorite = favorites.includes(car.id);

        return (
          <li key={car.id} className={css.listItem}>
            <div className={css.imageWrapper}>
              <Image
                src={car.img || "/placeholder.png"}
                alt={`${car.brand} ${car.model}`}
                fill
                sizes="(max-width: 768px) 100vw, 274px"
                className={css.img}
              />

              <button
                className={css.favoriteBtn}
                type="button"
                onClick={() => toggleFavorite(car.id)}
              >
                <svg
                  className={`${css.iconHeart} ${isFavorite ? css.active : ""}`}
                >
                  <use
                    href={`/sprite.svg#${isFavorite ? "icon-like-active" : "icon-like-default"}`}
                  />
                </svg>
              </button>
            </div>

            <div className={css.content}>
              <div className={css.titleRow}>
                <h2 className={css.title}>
                  {car.brand} <span className={css.accent}>{car.model}</span>,{" "}
                  {car.year}
                </h2>
                <span className={css.price}>{car.rentalPrice}</span>
              </div>

              <div className={css.infoWrapper}>
                <div className={css.infoLine}>
                  <span>{city}</span>
                  <span>{country}</span>
                  <span>{car.rentalCompany}</span>
                </div>
                <div className={css.infoLine}>
                  <span>{car.type}</span>
                  <span>
                    {new Intl.NumberFormat("en-US")
                      .format(car.mileage)
                      .replace(/,/g, " ")}{" "}
                    km
                  </span>
                </div>
              </div>

              <Link href={`/catalog/${car.id}`} className={css.learnMoreBtn}>
                Read more
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
