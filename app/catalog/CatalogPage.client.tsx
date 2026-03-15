"use client";

import { useEffect } from "react";
import { useCarStore } from "@/lib/store/carStore";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import CarList from "@/components/Cars/CarList";
import css from "./CatalogPage.module.css";

export default function CatalogClient() {
  const cars = useCarStore((state) => state.cars);
  const isLoading = useCarStore((state) => state.isLoading);
  const hasMore = useCarStore((state) => state.hasMore);
  const fetchCars = useCarStore((state) => state.fetchCars);
  useEffect(() => {
    if (cars.length === 0) {
      fetchCars(true);
    }
  }, [fetchCars, cars.length]);

  return (
    <div className={css.catalogContainer}>
      <FilterPanel />
      {cars.length > 0 ? (
        <CarList cars={cars} />
      ) : (
        !isLoading && <p className={css.empty}>No cars found.</p>
      )}

      {isLoading && <div className={css.loader}>Loading...</div>}
      {hasMore && !isLoading && cars.length > 0 && (
        <button className={css.loadMoreBtn} onClick={() => fetchCars()}>
          Load more
        </button>
      )}
    </div>
  );
}
