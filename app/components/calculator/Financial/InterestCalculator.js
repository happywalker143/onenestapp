"use client";
import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorInput from "../CalculatorInput";
import CalculatorButton from "../CalculatorButton";
import { useEffect, useState } from "react";

export default function InterestCalculator() {
    const dispatch = useDispatch();
    const { principal, rate, time, result } = useSelector(
        (state) => state.calculator.interest
    );

    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    const calculateInterest = () => {
        if (!principal || !rate || !time) return;

        // Simple Interest formula: SI = (P * R * T) / 100
        const P = parseFloat(principal);
        const R = parseFloat(rate);
        const T = parseFloat(time);
        const SI = (P * R * T) / 100;

        dispatch(setResult({ calculator: "interest", value: SI.toFixed(2) }));
    };

    if (!isClient) return null;

    return (
        <div className="flex flex-col space-y-4">
            <CalculatorInput
                label="Principal ($)"
                value={principal}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "interest", field: "principal", value: e.target.value }))
                }
                placeholder="Enter principal amount"
            />
            <CalculatorInput
                label="Rate of Interest (%)"
                value={rate}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "interest", field: "rate", value: e.target.value }))
                }
                placeholder="Enter interest rate"
            />
            <CalculatorInput
                label="Time (years)"
                value={time}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "interest", field: "time", value: e.target.value }))
                }
                placeholder="Enter time in years"
            />

            <CalculatorButton onClick={calculateInterest}>Calculate Interest</CalculatorButton>

            {result && <p className="text-center font-semibold">Simple Interest: ${result}</p>}
        </div>
    );
}
