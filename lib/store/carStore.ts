import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCars } from "@/lib/api";
import { Car } from "@/types/car";

interface CarStore {
  cars: Car[];
  favorites: string[];
  filters: {
    brand: string;
    rentalPrice: string;
    minMileage: string;
    maxMileage: string;
  };
  page: number;
  isLoading: boolean;
  hasMore: boolean;

  fetchCars: (isNewSearch?: boolean) => Promise<void>;
  applyFilters: () => void; // Додали сюди
  setFilter: (key: string, value: string) => void;
  toggleFavorite: (id: string) => void;
}

export const useCarStore = create<CarStore>()(
  persist(
    (set, get) => ({
      cars: [],
      favorites: [],
      page: 1,
      isLoading: false,
      hasMore: true,
      filters: {
        brand: "",
        rentalPrice: "",
        minMileage: "",
        maxMileage: "",
      },

      fetchCars: async (isNewSearch = false) => {
        const { filters, page, cars: existingCars, isLoading } = get();
        if (isLoading) return;

        set({ isLoading: true });
        const currentPage = isNewSearch ? 1 : page;

        try {
          const response = await getCars({
            brand: filters.brand || undefined,
            rentalPrice: filters.rentalPrice || undefined,
            minMileage: filters.minMileage || undefined,
            maxMileage: filters.maxMileage || undefined,
            page: String(currentPage),
            limit: "12",
          });

          const newCars = response.cars;
          const totalPages = response.totalPages;

          set({
            cars: isNewSearch ? newCars : [...existingCars, ...newCars],
            page: currentPage + 1,
            hasMore: currentPage < totalPages,
            isLoading: false,
          });
        } catch (error) {
          console.error("Fetch error:", error);
          set({ isLoading: false, hasMore: false });
        }
      },

      // Реалізація applyFilters — просто запускає новий пошук
      applyFilters: () => {
        get().fetchCars(true);
      },

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: "car-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    },
  ),
);
