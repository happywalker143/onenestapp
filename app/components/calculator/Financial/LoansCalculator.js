"use client";
import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorInput from "../CalculatorInput";
import CalculatorButton from "../CalculatorButton";
import { useState, useEffect } from "react";

export default function LoansCalculator() {
  const dispatch = useDispatch();
  const { loanAmount, interest, tenure, result } = useSelector(
    (state) => state.calculator.loans
  );

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // Monthly mortgage payment formula: M = P * r * (1+r)^n / ((1+r)^n - 1)
  const calculateLoan = () => {
    if (!loanAmount || !interest || !tenure) return;
    const P = parseFloat(loanAmount);
    const r = parseFloat(interest) / 100 / 12; // monthly interest rate
    const n = parseFloat(tenure) * 12; // total months
    const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    dispatch(setResult({ calculator: "loans", value: M.toFixed(2) }));
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col space-y-4">
      <CalculatorInput
        label="Loan Amount ($)"
        value={loanAmount}
        onChange={(e) =>
          dispatch(setInput({ calculator: "loans", field: "loanAmount", value: e.target.value }))
        }
        placeholder="Enter loan amount"
      />
      <CalculatorInput
        label="Annual Interest (%)"
        value={interest}
        onChange={(e) =>
          dispatch(setInput({ calculator: "loans", field: "interest", value: e.target.value }))
        }
        placeholder="Enter interest rate"
      />
      <CalculatorInput
        label="Tenure (years)"
        value={tenure}
        onChange={(e) =>
          dispatch(setInput({ calculator: "loans", field: "tenure", value: e.target.value }))
        }
        placeholder="Enter tenure"
      />

      <CalculatorButton onClick={calculateLoan}>Calculate Monthly Payment</CalculatorButton>

      {result && <p className="text-center font-semibold">Monthly Payment: ${result}</p>}
    </div>
  );
}
