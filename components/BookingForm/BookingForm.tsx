"use client";

import { useState } from "react";
import css from "./BookingForm.module.css";

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert("Booking successful!");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className={css.container}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form onSubmit={handleSubmit} className={css.form}>
        <input className={css.input} type="text" placeholder="Name*" required />
        <input
          className={css.input}
          type="email"
          placeholder="Email*"
          required
        />

        <div className={css.dateWrapper}>
          <input
            className={css.input}
            type="text"
            placeholder="Booking date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>

        <textarea className={css.textarea} placeholder="Comment"></textarea>

        <button className={css.submitBtn} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
