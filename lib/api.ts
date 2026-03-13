import axios from "axios";
import { Car, Brands } from "@/types/car";

export interface GetCarsParams {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  limit?: string;
  page?: string;
}

export interface GetCarsRes {
  cars: Car[];
  totalPages: number;
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.timeout = 5000;

export const getBrands = async () => {
  const res = await axios.get<Brands>("/brands");
  return res.data;
};

export const getCarId = async (id: string) => {
  const res = await axios.get<Car>(`/cars/${id}`);
  return res.data;
};

export const getCars = async ({
  brand,
  rentalPrice,
  minMileage,
  maxMileage,
  limit,
  page,
}: GetCarsParams): Promise<GetCarsRes> => {
  const { data } = await axios.get<GetCarsRes>("/cars", {
    params: {
      brand,
      rentalPrice,
      minMileage,
      maxMileage,
      limit,
      page,
    },
  });
  return data;
};
