import Image from "next/image";
import { getCarId } from "@/lib/api";
import BookingForm from "@/components/BookingForm/BookingForm";
import css from "./CarDetails.module.css";

const Icon = ({ id, className }: { id: string; className?: string }) => (
  <svg className={className}>
    <use href={`/sprite.svg#icon-${id}`} />
  </svg>
);

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CarDetailsPage({ params }: Props) {
  const { id } = await params;
  const car = await getCarId(id);

  if (!car) return <div className={css.error}>Car not found</div>;

  const allFeatures = [
    ...(car.accessories || []),
    ...(car.functionalities || []),
  ];

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.leftCol}>
          <div className={css.imageWrapper}>
            <Image
              src={car.img || "/placeholder.png"}
              alt={`${car.brand} ${car.model}`}
              fill
              className={css.img}
              priority
            />
          </div>
          <BookingForm />
        </div>

        <div className={css.rightCol}>
          <div className={css.header}>
            <h1 className={css.title}>
              {car.brand} {car.model}, {car.year}
              <span className={css.id}>Id: {car.id}</span>
            </h1>
          </div>

          <div className={css.metaLine}>
            <div className={css.metaItem}>
              <Icon id="location" className={css.iconMeta} />
              <span>{car.address.split(",").slice(-2).join(",")}</span>
            </div>
            <div className={css.metaItem}>
              <span>
                Mileage:{" "}
                {car.mileage.toLocaleString("en-US").replace(/,/g, " ")} km
              </span>
            </div>
          </div>

          <div className={css.price}>${car.rentalPrice}</div>
          <p className={css.description}>{car.description}</p>
          <div className={css.infoSection}>
            <h3 className={css.sectionTitle}>Rental Conditions:</h3>
            <ul className={css.featuresList}>
              {car.rentalConditions.map((condition, idx) => (
                <li key={idx} className={css.featureItem}>
                  <Icon id="check-circle" className={css.iconCheck} />
                  {condition}
                </li>
              ))}
            </ul>
          </div>
          <div className={css.infoSection}>
            <h3 className={css.sectionTitle}>Car Specifications:</h3>
            <ul className={css.specsList}>
              <li className={css.specItem}>
                <Icon id="calendar" className={css.iconSpec} />
                Year: {car.year}
              </li>
              <li className={css.specItem}>
                <Icon id="car" className={css.iconSpec} />
                Type: {car.type}
              </li>
              <li className={css.specItem}>
                <Icon id="fuel-pump" className={css.iconSpec} />
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li className={css.specItem}>
                <Icon id="gear" className={css.iconSpec} />
                Engine Size: {car.engineSize}
              </li>
            </ul>
          </div>

          <div className={css.infoSection}>
            <h3 className={css.sectionTitle}>
              Accessories and functionalities:
            </h3>
            <ul className={css.featuresList}>
              {allFeatures.map((feature, idx) => (
                <li key={idx} className={css.featureItem}>
                  <Icon id="check-circle" className={css.iconCheck} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
