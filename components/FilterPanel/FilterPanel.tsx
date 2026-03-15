"use client";

import { useState } from "react";
import { useBrands } from "@/hooks/useBrands";
import { useCarStore } from "@/lib/store/carStore";
import css from "./FilterPanel.module.css";

export default function FilterPanel() {
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const { data: brands = [], isLoading } = useBrands();
  const filters = useCarStore((state) => state.filters);
  const setFilter = useCarStore((state) => state.setFilter);
  const applyFilters = useCarStore((state) => state.applyFilters);

  const priceOptions = Array.from({ length: 18 }, (_, i) => 30 + i * 10);
  const formatNumber = (value: string) => {
    if (!value) return "";
    const number = value.replace(/\D/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <section className={css.filterBar}>
      <label className={css.label}>
        <span>Car brand</span>
        <div className={css.selectWrapper}>
          <select
            className={`${css.input} ${css.brandSelect}`}
            onClick={() => setIsBrandOpen(!isBrandOpen)}
            onBlur={() => setIsBrandOpen(false)}
            value={filters.brand}
            onChange={(e) => {
              setFilter("brand", e.target.value);
              setIsBrandOpen(false);
              e.target.blur();
            }}
          >
            <option value="">
              {isLoading ? "Loading..." : "Choose a brand"}
            </option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <svg className={css.arrowIcon}>
            <use
              href={`/sprite.svg#${isBrandOpen ? "icon-close-filter" : "icon-open-filter"}`}
            />
          </svg>
        </div>
      </label>

      <label className={css.label}>
        <span>Price / 1 hour</span>
        <div className={css.selectWrapper}>
          <select
            className={`${css.input} ${css.priceSelect}`}
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            onBlur={() => setIsPriceOpen(false)}
            value={filters.rentalPrice}
            onChange={(e) => {
              setFilter("rentalPrice", e.target.value);
              setIsPriceOpen(false);
              e.target.blur();
            }}
          >
            <option value="">Choose a price</option>
            {priceOptions.map((p) => (
              <option key={p} value={p.toString()}>
                {p}
              </option>
            ))}
          </select>
          <svg className={css.arrowIcon}>
            <use
              href={`/sprite.svg#${isPriceOpen ? "icon-close-filter" : "icon-open-filter"}`}
            />
          </svg>
        </div>
      </label>

      <div className={css.inputGroup}>
        <label className={css.label}>Сar mileage / km</label>
        <div className={css.rangeInputs}>
          <div className={css.inputWrapper}>
            <span className={css.inputLabel}>From</span>
            <input
              type="text"
              className={css.mileageInput}
              value={formatNumber(filters.minMileage?.toString() || "")}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                setFilter("minMileage", rawValue);
              }}
            />
          </div>

          <div className={css.inputWrapper}>
            <span className={css.inputLabel}>To</span>
            <input
              type="text"
              className={css.mileageInput}
              value={formatNumber(filters.maxMileage?.toString() || "")}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                setFilter("maxMileage", rawValue);
              }}
            />
          </div>
        </div>
      </div>
      <button className={css.searchBtn} onClick={applyFilters}>
        Search
      </button>
    </section>
  );
}
