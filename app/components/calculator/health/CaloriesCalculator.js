"use client";

import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorInput from "../CalculatorInput";
import CalculatorButton from "../CalculatorButton";

export default function CaloriesCalculator() {
    const dispatch = useDispatch();
    const { weight, height, age, gender, activity, result } = useSelector(
        (state) => state.calculator.calories || {
            weight: "",
            height: "",
            age: "",
            gender: "male",
            activity: "1.2",
            result: null,
        }
    );

    const calculateCalories = () => {
        if (!weight || !height || !age) return;

        // BMR calculation (Mifflin-St Jeor Equation)
        let bmr =
            gender === "male"
                ? 10 * weight + 6.25 * height - 5 * age + 5
                : 10 * weight + 6.25 * height - 5 * age - 161;

        // Total calories = BMR * activity factor
        const totalCalories = (bmr * parseFloat(activity)).toFixed(2);

        dispatch(setResult({ calculator: "calories", value: totalCalories }));
    };

    return (
        <>

            <CalculatorInput
                label="Weight (kg)"
                value={weight}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "calories", field: "weight", value: e.target.value }))
                }
                placeholder="Enter weight"
            />

            <CalculatorInput
                label="Height (cm)"
                value={height}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "calories", field: "height", value: e.target.value }))
                }
                placeholder="Enter height"
            />

            <CalculatorInput
                label="Age (years)"
                value={age}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "calories", field: "age", value: e.target.value }))
                }
                placeholder="Enter age"
            />

            {/* Gender select */}
            <div className="flex flex-col space-y-2">
                <label className="font-medium">Gender</label>
                <select
                    value={gender}
                    onChange={(e) =>
                        dispatch(setInput({ calculator: "calories", field: "gender", value: e.target.value }))
                    }
                    className="border border-gray-300 rounded p-2 bg-white text-black"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            {/* Activity level */}
            <div className="flex flex-col space-y-2">
                <label className="font-medium">Activity Level</label>
                <select
                    value={activity}
                    onChange={(e) =>
                        dispatch(setInput({ calculator: "calories", field: "activity", value: e.target.value }))
                    }
                    className="border border-gray-300 rounded p-2 bg-white text-black"
                >
                    <option value="1.2">Sedentary (little or no exercise)</option>
                    <option value="1.375">Lightly active (light exercise)</option>
                    <option value="1.55">Moderately active (moderate exercise)</option>
                    <option value="1.725">Very active (hard exercise)</option>
                    <option value="1.9">Extra active (very hard exercise)</option>
                </select>
            </div>

            <CalculatorButton onClick={calculateCalories}>
                Calculate Calories
            </CalculatorButton>

            {result && (
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold">Daily Calories: {result}</p>
                    <p className="text-sm text-gray-300">
                        (Based on BMR × Activity Level)
                    </p>
                </div>
            )}
        </>
    );
}
