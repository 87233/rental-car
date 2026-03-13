import { getBrands } from "@/lib/api";

export default async function pegeCatalog() {
  const brands = await getBrands();
  console.log(brands);
  return <div className="container">Cars</div>;
}
