"use client";

import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorInput from "../CalculatorInput";
import CalculatorButton from "../CalculatorButton";

export default function BMRCalculator() {
    const dispatch = useDispatch();
    const { weight, height, age, gender, result } = useSelector(
        (state) =>
            state.calculator.bmr || {
                weight: "",
                height: "",
                age: "",
                gender: "male",
                result: null,
            }
    );

    const calculateBMR = () => {
        if (!weight || !height || !age) return;

        let bmr = 0;
        if (gender === "male") {
            bmr =
                88.362 +
                13.397 * parseFloat(weight) +
                4.799 * parseFloat(height) -
                5.677 * parseFloat(age);
        } else {
            bmr =
                447.593 +
                9.247 * parseFloat(weight) +
                3.098 * parseFloat(height) -
                4.330 * parseFloat(age);
        }

        dispatch(setResult({ calculator: "bmr", value: bmr.toFixed(2) }));
    };

    return (
        <>


            {/* Gender Select */}
            <div className="flex flex-col space-y-2">
                <label className="font-medium">Gender</label>
                <select
                    value={gender}
                    onChange={(e) =>
                        dispatch(setInput({ calculator: "bmr", field: "gender", value: e.target.value }))
                    }
                    className="border border-gray-300 rounded p-2 bg-white text-black"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <CalculatorInput
                label="Weight (kg)"
                value={weight}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "bmr", field: "weight", value: e.target.value }))
                }
                placeholder="Enter weight in kg"
            />

            <CalculatorInput
                label="Height (cm)"
                value={height}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "bmr", field: "height", value: e.target.value }))
                }
                placeholder="Enter height in cm"
            />

            <CalculatorInput
                label="Age (years)"
                value={age}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "bmr", field: "age", value: e.target.value }))
                }
                placeholder="Enter age"
            />

            <CalculatorButton onClick={calculateBMR}>
                Calculate BMR
            </CalculatorButton>

            {result && (
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold">Your BMR: {result} kcal/day</p>
                    <p className="text-sm text-gray-300">
                        (Calories your body burns at rest)
                    </p>
                </div>
            )}
        </>
    );
}
