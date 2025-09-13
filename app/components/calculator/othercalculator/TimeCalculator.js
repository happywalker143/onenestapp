"use client";
import { useDispatch, useSelector } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorButton from "../CalculatorButton";

export default function TimeCalculator() {
    const dispatch = useDispatch();
    const { startTime, endTime, result } = useSelector(
        (state) => state.calculator.time
    );

    const calculateDifference = () => {
        if (!startTime || !endTime) return;

        const [h1, m1] = startTime.split(":").map(Number);
        const [h2, m2] = endTime.split(":").map(Number);

        const date1 = new Date(0, 0, 0, h1, m1);
        const date2 = new Date(0, 0, 0, h2, m2);

        let diff = (date2 - date1) / 1000; // seconds difference
        if (diff < 0) {
            // जर endTime लहान असेल तर दुसऱ्या दिवशी समजून
            diff += 24 * 60 * 60;
        }

        const hours = Math.floor(diff / 3600);
        diff %= 3600;
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;

        dispatch(
            setResult({
                calculator: "time",
                value: { hours, minutes, seconds },
            })
        );
    };

    return (

        <>
            <input
                type="time"
                value={startTime}
                onChange={(e) =>
                    dispatch(
                        setInput({
                            calculator: "time",
                            field: "startTime",
                            value: e.target.value,
                        })
                    )
                }
                className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />


            <div className="flex flex-col space-y-2">
                <label className="font-medium">End Time</label>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) =>
                        dispatch(
                            setInput({
                                calculator: "time",
                                field: "endTime",
                                value: e.target.value,
                            })
                        )
                    }
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <CalculatorButton onClick={calculateDifference}>
                Calculate Time Difference
            </CalculatorButton>

            {result && (
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold">
                        Difference: {result.hours} hours, {result.minutes} minutes,{" "}
                        {result.seconds} seconds
                    </p>
                </div>
            )}
        </>
    );
}