"use client";

import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice"; // ✅ correct path
import CalculatorInput from "../CalculatorInput";
import CalculatorButton from "../CalculatorButton";
import { useState, useEffect } from "react";

export default function IncomeTaxCalculator() {
    const dispatch = useDispatch();
    const { income, result } = useSelector(
        (state) => state.calculator.incomeTax || { income: "", result: null }
    );

    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    const calculateTax = () => {
        if (!income) return;

        let taxableIncome = parseFloat(income);
        let tax = 0;

        // Example Slabs (You can update as per your country)
        if (taxableIncome <= 250000) {
            tax = 0;
        } else if (taxableIncome <= 500000) {
            tax = (taxableIncome - 250000) * 0.05;
        } else if (taxableIncome <= 1000000) {
            tax = 12500 + (taxableIncome - 500000) * 0.2;
        } else {
            tax = 112500 + (taxableIncome - 1000000) * 0.3;
        }

        dispatch(
            setResult({
                calculator: "incomeTax",
                value: {
                    income: taxableIncome.toFixed(2),
                    tax: tax.toFixed(2),
                    netIncome: (taxableIncome - tax).toFixed(2),
                },
            })
        );
    };

    if (!isClient) return null;

    return (
        <>

            <CalculatorInput
                label="Annual Income (₹)"
                value={income}
                onChange={(e) =>
                    dispatch(
                        setInput({
                            calculator: "incomeTax",
                            field: "income",
                            value: e.target.value,
                        })
                    )
                }
                placeholder="Enter annual income"
            />

            <CalculatorButton onClick={calculateTax}>
                Calculate Tax
            </CalculatorButton>

            {result && (
                <div className="text-center space-y-2">
                    <p>Total Income: ₹{result.income}</p>
                    <p>Tax Payable: ₹{result.tax}</p>
                    <p>Net Income (After Tax): ₹{result.netIncome}</p>
                </div>
            )}
        </>
    );
}
