"use client";

import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorInput from "../CalculatorInput";
import CalculatorButton from "../CalculatorButton";

export default function DueDateCalculator() {
    const dispatch = useDispatch();
    const { lmp, result } = useSelector(
        (state) =>
            state.calculator.dueDate || {
                lmp: "",
                result: null,
            }
    );

    const calculateDueDate = () => {
        if (!lmp) return;

        const lmpDate = new Date(lmp);
        if (isNaN(lmpDate)) return;

        const dueDate = new Date(lmpDate);
        dueDate.setDate(dueDate.getDate() + 280); // 40 weeks

        const formatted = dueDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        dispatch(setResult({ calculator: "dueDate", value: formatted }));
    };

    return (
        <>

            <div className="flex flex-col space-y-2">
                <label className="font-medium">Last Menstrual Period (LMP)</label>
                <input
                    type="date"
                    value={lmp}
                    onChange={(e) =>
                        dispatch(setInput({ calculator: "dueDate", field: "lmp", value: e.target.value }))
                    }
                    className="border border-gray-300 rounded p-2 bg-white text-black"
                />
            </div>

            <CalculatorButton onClick={calculateDueDate}>
                Calculate Due Date
            </CalculatorButton>

            {result && (
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold">Estimated Due Date:</p>
                    <p className="text-xl font-bold text-green-400">{result}</p>
                    <p className="text-sm text-gray-300 mt-2">(Based on Naegele’s Rule)</p>
                </div>
            )}
        </>
    );
}
