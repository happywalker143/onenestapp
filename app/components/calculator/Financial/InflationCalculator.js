"use client";

import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice"; // ✅ correct path
import CalculatorInput from "../CalculatorInput"; // ✅ inside calculator folder
import CalculatorButton from "../CalculatorButton"; // ✅ inside calculator folder
import { useState, useEffect } from "react";

export default function InflationCalculator() {
    const dispatch = useDispatch();
    const { amount, rate, years, result } = useSelector(
        (state) => state.calculator.inflation
    );

    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    const calculateInflation = () => {
        if (!amount || !rate || !years) return;

        const P = parseFloat(amount);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(years);

        const futureValue = P / Math.pow(1 + r, t);

        dispatch(
            setResult({
                calculator: "inflation",
                value: {
                    futureValue: futureValue.toFixed(2),
                    loss: (P - futureValue).toFixed(2),
                },
            })
        );
    };

    if (!isClient) return null;

    return (
        <>

            <CalculatorInput
                label="Current Amount ($)"
                value={amount}
                onChange={(e) =>
                    dispatch(
                        setInput({
                            calculator: "inflation",
                            field: "amount",
                            value: e.target.value,
                        })
                    )
                }
                placeholder="Enter amount"
            />

            <CalculatorInput
                label="Annual Inflation Rate (%)"
                value={rate}
                onChange={(e) =>
                    dispatch(
                        setInput({
                            calculator: "inflation",
                            field: "rate",
                            value: e.target.value,
                        })
                    )
                }
                placeholder="Enter rate %"
            />

            <CalculatorInput
                label="Years"
                value={years}
                onChange={(e) =>
                    dispatch(
                        setInput({
                            calculator: "inflation",
                            field: "years",
                            value: e.target.value,
                        })
                    )
                }
                placeholder="Enter years"
            />

            <CalculatorButton onClick={calculateInflation}>
                Calculate Future Value
            </CalculatorButton>

            {result && (
                <div className="text-center space-y-2">
                    <p>Future Value: ${result.futureValue}</p>
                    <p>Value Lost due to Inflation: ${result.loss}</p>
                </div>
            )}
        </>
    );
}
