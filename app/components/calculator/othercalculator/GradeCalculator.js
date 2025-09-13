"use client";

import { useDispatch, useSelector } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorButton from "../CalculatorButton";
import CalculatorInput from "../CalculatorInput";

export default function GradeCalculator() {
    const dispatch = useDispatch();
    const { marks, result } = useSelector((state) => state.calculator.grade);

    const calculateGrade = () => {
        const score = parseFloat(marks);

        if (isNaN(score) || score < 0 || score > 100) {
            dispatch(
                setResult({
                    calculator: "grade",
                    value: "Please enter valid marks (0 - 100)",
                })
            );
            return;
        }

        let grade = "";
        if (score >= 90) grade = "A+";
        else if (score >= 80) grade = "A";
        else if (score >= 70) grade = "B";
        else if (score >= 60) grade = "C";
        else if (score >= 50) grade = "D";
        else grade = "F";

        dispatch(
            setResult({
                calculator: "grade",
                value: `Your Grade: ${grade}`,
            })
        );
    };

    return (
        <div className="space-y-4">
            <CalculatorInput
                label="Enter Marks"
                type="number"
                value={marks}
                onChange={(e) =>
                    dispatch(
                        setInput({
                            calculator: "grade",
                            field: "marks",
                            value: e.target.value,
                        })
                    )
                }
                placeholder="Enter marks (0-100)"
            />

            <CalculatorButton onClick={calculateGrade}>
                Calculate Grade
            </CalculatorButton>

            {result && (
                <div className="text-center mt-4 text-lg font-semibold">{result}</div>
            )}
        </div>
    );
}
