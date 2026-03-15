import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/lib/api";
import { Brands } from "@/types/car";

export function useBrands() {
  const { data, isLoading, error } = useQuery<Brands>({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
  });
  return { data, isLoading, error };
}
