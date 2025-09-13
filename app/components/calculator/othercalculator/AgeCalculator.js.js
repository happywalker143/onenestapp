"use client";

import { useState, useEffect } from "react";
import CalculatorInput from "../CalculatorInput";
import CalculatorButton from "../CalculatorButton";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState(null);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const calculateAge = () => {
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    // adjust if month/day is negative
    if (ageDays < 0) {
      ageMonths -= 1;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    setResult({ years: ageYears, months: ageMonths, days: ageDays });
  };

  return (
    <>

      <div className="flex flex-col space-y-2">
        <label className="font-medium">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <CalculatorButton onClick={calculateAge}>Calculate Age</CalculatorButton>

      {result && (
        <div className="text-center mt-4">
          <p className="text-lg font-semibold">
            You are {result.years} years, {result.months} months, and{" "}
            {result.days} days old.
          </p>
        </div>
      )}
    </>
  );
}
