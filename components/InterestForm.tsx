"use client";

import { useState, useCallback } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  costGuess: string;
  spidrPin: string;
}

const defaultFormData: FormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  costGuess: "",
  spidrPin: "",
};

const InterestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [submitted, setSubmitted] = useState(false);

  // Enforce spidr pin format
  const formatSpidrPin = (value: string): string => {
    const raw = value.replace(/\D/g, "").slice(0, 16); // only accepts digits
    return raw.match(/.{1,4}/g)?.join("-") || ""; // delimiter
  };

  // Avoid re-renders; memoized function
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "spidrPin" ? formatSpidrPin(value) : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Form Submitted:", formData);
      setSubmitted(true);
    },
    [formData]
  );

  const handleReset = () => {
    setFormData(defaultFormData);
    setSubmitted(false);
  };

  return (
    <div className="max-w-lg bg-cyan-800 p-8 mt-16 mx-auto">
      {!submitted ? (
        <form
          className="interest-form fade-in font-default"
          onSubmit={handleSubmit}
        >
          <h1 className="font-display text-3xl mb-6 text-white text-center font-extralight">
            Join the Air Fryer Craze
          </h1>

          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              pattern="^\d{10,15}$"
              onChange={handleChange}
              title="Enter a valid phone number (10–15 digits)"
              placeholder="123-456-7890"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="costGuess">Guess the Air Fryer’s Cost ($)</label>
            <input
              type="number"
              name="costGuess"
              value={formData.costGuess}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="spidrPin">Very Secret 16-Digit Spidr PIN</label>
            <input
              type="text"
              name="spidrPin"
              value={formData.spidrPin}
              onChange={handleChange}
              placeholder="####-####-####-####"
              required
            />
          </div>
          <div className="flex justify-center">
            <button className="btn w-25" type="submit">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className=" font-default text-center p-8 text-white fade-in">
          <h2 className="font-light">Form Submitted Successfully!</h2>
          <p className="font-thin text-sm">
            Thanks for joining the Air Fryer Craze.
          </p>
          <button className="btn w-50 mt-5" onClick={handleReset}>
            Submit Another Entry
          </button>
        </div>
      )}
    </div>
  );
};

export default InterestForm;
