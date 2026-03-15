import CatalogClient from "./CatalogPage.client";

export const metadata = {
  title: "Car Rental - Catalog",
  description: "Find your perfect car today",
};

export default async function CatalogPage() {
  return (
    <section className="container">
      <CatalogClient />
    </section>
  );
}
