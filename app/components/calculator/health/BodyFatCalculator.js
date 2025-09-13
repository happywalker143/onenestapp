"use client";

import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorInput from "../CalculatorInput";
import CalculatorButton from "../CalculatorButton";

export default function BodyFatCalculator() {
    const dispatch = useDispatch();
    const { gender, waist, neck, height, hip, result } = useSelector(
        (state) => state.calculator.bodyFat || {
            gender: "male",
            waist: "",
            neck: "",
            height: "",
            hip: "",
            result: null,
        }
    );

    const calculateBodyFat = () => {
        if (!waist || !neck || !height) return;

        let bodyFat = 0;

        if (gender === "male") {
            // U.S. Navy formula for men
            bodyFat =
                495 /
                (1.0324 -
                    0.19077 * Math.log10(waist - neck) +
                    0.15456 * Math.log10(height)) -
                450;
        } else {
            if (!hip) return;
            // U.S. Navy formula for women
            bodyFat =
                495 /
                (1.29579 -
                    0.35004 * Math.log10(waist + hip - neck) +
                    0.221 * Math.log10(height)) -
                450;
        }

        const bodyFatPercent = bodyFat.toFixed(2);
        dispatch(setResult({ calculator: "bodyFat", value: bodyFatPercent }));
    };

    return (
        <>

            {/* Gender select */}
            <div className="flex flex-col space-y-2">
                <label className="font-medium">Gender</label>
                <select
                    value={gender}
                    onChange={(e) =>
                        dispatch(
                            setInput({ calculator: "bodyFat", field: "gender", value: e.target.value })
                        )
                    }
                    className="border border-gray-300 rounded-lg p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium focus:outline-none focus:ring-2 focus:ring-pink-400 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 transition-colors">
                    <option value="male" className="bg-white text-black">Male</option>
                    <option value="female" className="bg-white text-black">Female</option>
                </select>

            </div>

            <CalculatorInput
                label="Waist (cm)"
                value={waist}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "bodyFat", field: "waist", value: e.target.value }))
                }
                placeholder="Enter waist size"
            />

            <CalculatorInput
                label="Neck (cm)"
                value={neck}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "bodyFat", field: "neck", value: e.target.value }))
                }
                placeholder="Enter neck size"
            />

            <CalculatorInput
                label="Height (cm)"
                value={height}
                onChange={(e) =>
                    dispatch(setInput({ calculator: "bodyFat", field: "height", value: e.target.value }))
                }
                placeholder="Enter height"
            />

            {gender === "female" && (
                <CalculatorInput
                    label="Hip (cm)"
                    value={hip}
                    onChange={(e) =>
                        dispatch(setInput({ calculator: "bodyFat", field: "hip", value: e.target.value }))
                    }
                    placeholder="Enter hip size"
                />
            )}

            <CalculatorButton onClick={calculateBodyFat}>
                Calculate Body Fat
            </CalculatorButton>

            {result && (
                <div className="text-center mt-4">
                    <p className="text-lg font-semibold">Body Fat: {result}%</p>
                    <p className="text-sm text-gray-300">(U.S. Navy Method)</p>
                </div>
            )}
        </>
    );
}
