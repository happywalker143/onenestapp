import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bmi: { weight: "", height: "", result: null },
    loans: { loanAmount: "", interest: "", tenure: "", result: null },
    age: { dob: "", result: null },
    interest: { principal: "", rate: "", time: "", result: null },
    mortgage: { principal: "", rate: "", years: "", result: null },
    payment: { amount: "", rate: "", time: "", result: null }, // payment calculator
    inflation: { amount: "", rate: "", years: "", result: null }, //Inflation
    incomeTax: { income: "", result: null }, // 
    salesInterest: { previousSales: "", currentSales: "", result: null },
    compoundInterest: { principal: "", rate: "", time: "", frequency: "", result: null }, //
    calories: { weight: "", height: "", age: "", gender: "male", activity: "1.2", result: null }, // ✅ new
    bodyFat: { gender: "male", waist: "", neck: "", height: "", hip: "", result: null }, // ✅ new
    bmr: { weight: "", height: "", age: "", gender: "male", result: null }, // ✅ new
    dueDate: { lmp: "", result: null }, // ✅ new
    idealWeight: { height: "", gender: "male", result: null },
    age: { dob: "", result: null },
    date: { startDate: "", endDate: "", result: null }, // ✅ New
    time: { startTime: "", endTime: "", result: null },
    cgpa: { grades: [""], result: null },
    grade: { marks: "", result: null },
    advanced: { input: "", result: null },// <-- Advanced Calculator slice



};

const calculatorSlice = createSlice({
    name: "calculator",
    initialState,
    reducers: {
        setInput: (state, action) => {
            const { calculator, field, value } = action.payload;
            state[calculator][field] = value;
        },
        setResult: (state, action) => {
            const { calculator, value } = action.payload;
            state[calculator].result = value;
        },
    },
});

export const { setInput, setResult } = calculatorSlice.actions;
export default calculatorSlice.reducer;
