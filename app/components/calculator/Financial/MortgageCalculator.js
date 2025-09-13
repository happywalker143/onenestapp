"use client";
import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorInput from "../CalculatorInput";
import CalculatorButton from "../CalculatorButton";
import { useEffect, useState } from "react";

export default function MortgageCalculator() {
    const dispatch = useDispatch();
    const { principal, rate, years, result } = useSelector(
        (state) => state.calculator.mortgage
    );

    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    const calculateEMI = () => {
        if (!principal || !rate || !years) return;

        const P = parseFloat(principal);
        const r = parseFloat(rate) / 12 / 100; // monthly interest rate
        const n = parseFloat(years) * 12; // total months

        const EMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayment = EMI * n;
        const totalInterest = totalPayment - P;

        dispatch(
            setResult({
                calculator: "mortgage",
                value: {
                    EMI: EMI.toFixed(2),
                    totalInterest: totalInterest.toFixed(2),
                    totalPayment: totalPayment.toFixed(2),
                },
            })
        );
    };

    if (!isClient) return null;

    return (

        <>
            <CalculatorInput
                label="Principal ($)"
                value={principal}
                onChange={(e) =>
                    dispatch(
                        setInput({ calculator: "mortgage", field: "principal", value: e.target.value })
                    )
                }
                placeholder="Enter principal"
            />

            <CalculatorInput
                label="Annual Interest Rate (%)"
                value={rate}
                onChange={(e) =>
                    dispatch(
                        setInput({ calculator: "mortgage", field: "rate", value: e.target.value })
                    )
                }
                placeholder="Enter annual interest rate"
            />

            <CalculatorInput
                label="Loan Tenure (years)"
                value={years}
                onChange={(e) =>
                    dispatch(
                        setInput({ calculator: "mortgage", field: "years", value: e.target.value })
                    )
                }
                placeholder="Enter tenure in years"
            />

            <CalculatorButton onClick={calculateEMI}>Calculate EMI</CalculatorButton>

            {result && (
                <div className="text-center space-y-2">
                    <p>Monthly EMI: ${result.EMI}</p>
                    <p>Total Interest: ${result.totalInterest}</p>
                    <p>Total Payment: ${result.totalPayment}</p>
                </div>
            )}
        </>
    );
}
