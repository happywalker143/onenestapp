"use client";
import { useParams } from "next/navigation";
import BMICalculator from "../../components/calculator/health/BMICalculator";
import Container from "../../components/calculator/Container";
import LoansCalculator from "../../components/calculator/Financial/LoansCalculator"
import CalculatorLayout from "../../components/calculator/CalculatorLayout";
import MortgageCalculator from "../../components/calculator/Financial/MortgageCalculator"
import InterestCalculator from "../../components/calculator/Financial/InterestCalculator"
import PaymentCalculator from "@/app/components/calculator/Financial/PaymentCalculator";
import InflationCalculator from "@/app/components/calculator/Financial/InflationCalculator";
import IncomeTaxCalculator from "@/app/components/calculator/Financial/IncomeTaxCalculator";
import CompoundInterestCalculator from "@/app/components/calculator/Financial/CompoundIntrestCalculator";
import SalesInterestCalculator from "@/app/components/calculator/Financial/SalestaxCalculator";
import CaloriesCalculator from "@/app/components/calculator/health/caloriesCalculator";
import BodyFatCalculator from "@/app/components/calculator/health/BodyFatCalculator";
import BMRCalculator from "@/app/components/calculator/health/BMRCalculator";
import DueDateCalculator from "@/app/components/calculator/health/DueDateCalculator";
import IdealWeightCalculator from "@/app/components/calculator/health/IdealWeightCalculator";
import AgeCalculator from "@/app/components/calculator/othercalculator/AgeCalculator.js";
import DateCalculator from "@/app/components/calculator/othercalculator/DateCalculator";
import TimeCalculator from "@/app/components/calculator/othercalculator/TimeCalculator";
import CGPACalculator from "@/app/components/calculator/othercalculator/CGPACalculator";
import GradeCalculator from "@/app/components/calculator/othercalculator/GradeCalculator";
const calculatorsMap = {
  bmi: BMICalculator,
  loan: LoansCalculator,
  interest: InterestCalculator,
  mortgage: MortgageCalculator,
  payment: PaymentCalculator,
  inflation: InflationCalculator,
  income: IncomeTaxCalculator,
  compound: CompoundInterestCalculator,
  sales: SalesInterestCalculator,
  calories: CaloriesCalculator,
  bodyFat: BodyFatCalculator,
  bmr: BMRCalculator,
  dueDate: DueDateCalculator, // ✅
  idealWeight: IdealWeightCalculator,
  age: AgeCalculator,
  date: DateCalculator,
  time: TimeCalculator,
  cgpa: CGPACalculator,
  grade: GradeCalculator,





};

export default function CalculatorPage() {
  const { slug } = useParams();
  const Calculator = calculatorsMap[slug];

  if (!Calculator) return <p>Calculator not found!</p>;

  return (
    <Container>
      <CalculatorLayout title={slug.toUpperCase()}>
        <Calculator />
      </CalculatorLayout>
    </Container>
  );
}
