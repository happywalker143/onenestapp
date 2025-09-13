"use client";
import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../store/calculatorSlice";
import CalculatorInput from "../CalculatorInput";
import CalculatorButton from "../CalculatorButton";

export default function BMICalculator() {
  const dispatch = useDispatch();
  const { weight, height, result } = useSelector((state) => state.calculator.bmi);

  const calculateBMI = () => {
    if (!weight || !height) return;
    const h = parseFloat(height) / 100;
    const bmiValue = (parseFloat(weight) / (h * h)).toFixed(2);
    dispatch(setResult({ calculator: "bmi", value: bmiValue }));
  };

  return (
    <div className="flex flex-col space-y-4">
      <CalculatorInput
        label="Weight (kg)"
        value={weight}
        onChange={(e) =>
          dispatch(setInput({ calculator: "bmi", field: "weight", value: e.target.value }))
        }
        placeholder="Enter weight"
      />
      <CalculatorInput
        label="Height (cm)"
        value={height}
        onChange={(e) =>
          dispatch(setInput({ calculator: "bmi", field: "height", value: e.target.value }))
        }
        placeholder="Enter height"
      />
      <CalculatorButton onClick={calculateBMI}>Calculate BMI</CalculatorButton>
      {result && <p className="text-center font-semibold">BMI: {result}</p>}
    </div>
  );
}
