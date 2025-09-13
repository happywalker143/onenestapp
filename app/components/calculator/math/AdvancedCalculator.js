"use client";

import { useDispatch, useSelector } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorButton from "../CalculatorButton";

export default function CGPACalculator() {
    const dispatch = useDispatch();
    const { grades, result } = useSelector((state) => state.calculator.cgpa);

    const updateGrade = (index, value) => {
        const updated = [...grades];
        updated[index] = value;
        dispatch(
            setInput({
                calculator: "cgpa",
                field: "grades",
                value: updated,
            })
        );
    };

    const addGrade = () => {
        dispatch(
            setInput({
                calculator: "cgpa",
                field: "grades",
                value: [...grades, ""],
            })
        );
    };

    const calculateCGPA = () => {
        const numericGrades = grades.map((g) => parseFloat(g)).filter((g) => !isNaN(g));
        if (numericGrades.length === 0) return;

        const total = numericGrades.reduce((a, b) => a + b, 0);
        const cgpa = (total / numericGrades.length).toFixed(2);

        dispatch(
            setResult({
                calculator: "cgpa",
                value: cgpa,
            })
        );
    };

    return (
        <div className="space-y-4">
            {grades.map((grade, index) => (
                <input
                    key={index}
                    type="number"
                    step="0.01"
                    placeholder={`Grade ${index + 1}`}
                    value={grade}
                    onChange={(e) => updateGrade(index, e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            ))}

            <div className="flex gap-2">
                <CalculatorButton onClick={addGrade} className="bg-blue-600 hover:bg-blue-700">
                    + Add Subject
                </CalculatorButton>
                <CalculatorButton onClick={calculateCGPA} className="bg-green-600 hover:bg-green-700">
                    Calculate CGPA
                </CalculatorButton>
            </div>

            {result && (
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold">Your CGPA: {result}</p>
                </div>
            )}
        </div>
    );
}
