"use client";

import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorInput from "../CalculatorInput";
import CalculatorButton from "../CalculatorButton";
import { useState, useEffect } from "react";

export default function SalesInterestCalculator() {
    const dispatch = useDispatch();
    const { principal, rate, time, result } = useSelector(
        (state) => state.calculator.simpleInterest || {
            principal: "",
            rate: "",
            time: "",
            result: null,
        }
    );

    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    const calculateInterest = () => {
        if (!principal || !rate || !time) return;
        const P = parseFloat(principal);
        const R = parseFloat(rate);
        const T = parseFloat(time);

        const SI = (P * R * T) / 100;

        dispatch(
            setResult({
                calculator: "simpleInterest",
                value: {
                    principal: P.toFixed(2),
                    rate: R,
                    time: T,
                    interest: SI.toFixed(2),
                    total: (P + SI).toFixed(2),
                },
            })
        );
    };

    if (!isClient) return null;

    return (
        <>

            <CalculatorInput
                label="Principal Amount (₹)"
                value={principal}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "simpleInterest", field: "principal", value: e.target.value }))
                }
                placeholder="Enter principal"
            />

            <CalculatorInput
                label="Rate of Interest (%)"
                value={rate}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "simpleInterest", field: "rate", value: e.target.value }))
                }
                placeholder="Enter rate"
            />

            <CalculatorInput
                label="Time (Years)"
                value={time}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "simpleInterest", field: "time", value: e.target.value }))
                }
                placeholder="Enter time"
            />

            <CalculatorButton onClick={calculateInterest}>Calculate</CalculatorButton>

            {result && (
                <div className="text-center space-y-2">
                    <p>Principal: ₹{result.principal}</p>
                    <p>Interest: ₹{result.interest}</p>
                    <p>Total Amount: ₹{result.total}</p>
                </div>
            )}
        </>
    );
}
