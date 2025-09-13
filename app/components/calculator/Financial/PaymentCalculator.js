"use client";

import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorInput from "../CalculatorInput";
import CalculatorButton from "../CalculatorButton";
import { useEffect, useState } from "react";

export default function PaymentCalculator() {
    const dispatch = useDispatch();
    const { amount, rate, time, result } = useSelector(
        (state) => state.calculator.payment
    );

    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    const calculatePayment = () => {
        if (!amount || !rate || !time) return;

        const P = parseFloat(amount);
        const R = parseFloat(rate) / 100; // annual interest rate
        const T = parseFloat(time); // years

        const totalPayment = P + P * R * T; // simple interest formula
        const monthlyPayment = totalPayment / (T * 12);

        dispatch(
            setResult({
                calculator: "payment",
                value: {
                    totalPayment: totalPayment.toFixed(2),
                    monthlyPayment: monthlyPayment.toFixed(2),
                },
            })
        );
    };

    if (!isClient) return null;

    return (
        <>

            <CalculatorInput
                label="Principal Amount ($)"
                value={amount}
                onChange={(e) =>
                    dispatch(
                        setInput({ calculator: "payment", field: "amount", value: e.target.value })
                    )
                }
                placeholder="Enter principal amount"
            />

            <CalculatorInput
                label="Annual Interest Rate (%)"
                value={rate}
                onChange={(e) =>
                    dispatch(
                        setInput({ calculator: "payment", field: "rate", value: e.target.value })
                    )
                }
                placeholder="Enter interest rate"
            />

            <CalculatorInput
                label="Time (Years)"
                value={time}
                onChange={(e) =>
                    dispatch(
                        setInput({ calculator: "payment", field: "time", value: e.target.value })
                    )
                }
                placeholder="Enter time in years"
            />

            <CalculatorButton onClick={calculatePayment}>Calculate Payment</CalculatorButton>

            {result && (
                <div className="text-center space-y-2">
                    <p>Total Payment: ${result.totalPayment}</p>
                    <p>Monthly Payment: ${result.monthlyPayment}</p>
                </div>
            )}
        </>
    );
}
