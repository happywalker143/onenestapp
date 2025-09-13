"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorButton from "../CalculatorButton";

export default function DateCalculator() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    const dispatch = useDispatch();
    const { startDate, endDate, result } = useSelector(
        (state) => state.calculator.date
    );

    const calculateDifference = () => {
        if (!startDate || !endDate) return;

        const d1 = new Date(startDate);
        const d2 = new Date(endDate);

        if (d1 > d2) return alert("End date must be after start date!");

        let years = d2.getFullYear() - d1.getFullYear();
        let months = d2.getMonth() - d1.getMonth();
        let days = d2.getDate() - d1.getDate();

        if (days < 0) {
            months -= 1;
            days += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years -= 1;
            months += 12;
        }

        dispatch(
            setResult({
                calculator: "date",
                value: { years, months, days },
            })
        );
    };

    if (!isClient) return null; // ✅ prevents hydration mismatch

    return (
        <>
            <div className="flex flex-col space-y-2">
                <label className="font-medium">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) =>
                        dispatch(
                            setInput({
                                calculator: "date",
                                field: "startDate",
                                value: e.target.value,
                            })
                        )
                    }
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label className="font-medium">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) =>
                        dispatch(
                            setInput({
                                calculator: "date",
                                field: "endDate",
                                value: e.target.value,
                            })
                        )
                    }
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <CalculatorButton onClick={calculateDifference}>
                Calculate Difference
            </CalculatorButton>

            {result && (
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold">
                        Difference: {result.years} years, {result.months} months,{" "}
                        {result.days} days
                    </p>
                </div>
            )}
        </>
    );
}
