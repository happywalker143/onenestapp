"use client";

import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorInput from "../CalculatorInput";
import CalculatorButton from "../CalculatorButton";

export default function IdealWeightCalculator() {
    const dispatch = useDispatch();
    const { height, gender, result } = useSelector((state) => state.calculator.idealWeight);

    const calculateIdealWeight = () => {
        if (!height || height <= 0) {
            dispatch(setResult({ calculator: "idealWeight", value: "Enter valid height" }));
            return;
        }

        const heightInInches = height / 2.54; // cm → inches
        let ideal;

        if (gender === "male") {
            ideal = 50 + 2.3 * (heightInInches - 60);
        } else {
            ideal = 45.5 + 2.3 * (heightInInches - 60);
        }

        dispatch(
            setResult({
                calculator: "idealWeight",
                value: ideal.toFixed(2) + " kg",
            })
        );
    };

    return (
        <>

            <CalculatorInput
                label="Height (cm)"
                value={height}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "idealWeight", field: "height", value: e.target.value }))
                }
                placeholder="Enter height in cm"
            />

            <div className="flex flex-col space-y-2">
                <label className="font-medium">Gender</label>
                <select
                    value={gender}
                    onChange={(e) =>
                        dispatch(setInput({ calculator: "idealWeight", field: "gender", value: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded p-2 bg-white text-black"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <CalculatorButton onClick={calculateIdealWeight}>Calculate</CalculatorButton>

            {result && (
                <div className="text-center font-semibold text-lg text-white">
                    Ideal Weight: {result}
                </div>
            )}
        </>
    );
}
