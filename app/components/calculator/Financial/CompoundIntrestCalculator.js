"use client";

import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorInput from "../CalculatorInput";
import CalculatorButton from "../CalculatorButton";
import { useState, useEffect } from "react";

export default function CompoundInterestCalculator() {
    const dispatch = useDispatch();
    const { principal, rate, time, frequency, result } = useSelector(
        (state) => state.calculator.compoundInterest || {
            principal: "",
            rate: "",
            time: "",
            frequency: 1,
            result: null,
        }
    );

    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    const calculateInterest = () => {
        if (!principal || !rate || !time || !frequency) return;
        const P = parseFloat(principal);
        const R = parseFloat(rate) / 100;
        const T = parseFloat(time);
        const N = parseFloat(frequency);

        const A = P * Math.pow(1 + R / N, N * T);
        const TI = A - P;
        const CI = A - P;

        dispatch(
            setResult({
                calculator: "compoundInterest",
                value: {
                    principal: P.toFixed(2),
                    rate,
                    time,
                    frequency,
                    interest: CI.toFixed(2),
                    total: A.toFixed(2),
                    totalIntrest: TI.toFixed(2)
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
                    dispatch(setInput({ calculator: "compoundInterest", field: "principal", value: e.target.value }))
                }
                placeholder="Enter principal"
            />

            <CalculatorInput
                label="Rate of Interest (%)"
                value={rate}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "compoundInterest", field: "rate", value: e.target.value }))
                }
                placeholder="Enter rate"
            />

            <CalculatorInput
                label="Time (Years)"
                value={time}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "compoundInterest", field: "time", value: e.target.value }))
                }
                placeholder="Enter time"
            />

            <CalculatorInput
                label="Compounding Frequency (per year)"
                value={frequency}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "compoundInterest", field: "frequency", value: e.target.value }))
                }
                placeholder="e.g. 1=Yearly,2=half yearly  4=Quarterly, 12=Monthly"
            />

            <CalculatorButton onClick={calculateInterest}>Calculate</CalculatorButton>

            {result && (
                <div className="text-center space-y-2">
                    <p>Principal: ₹{result.principal}</p>
                    <p>Compound Interest: ₹{result.interest}</p>
                    <p>Total Amount: ₹{result.total}</p>
                    <p>Total Interest:₹{result.totalIntrest}</p>
                    {console.log("button click")}
                </div>
            )}
        </>
    );
}
