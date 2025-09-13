"use client";
// pages/index.js

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "../slices/counterSlice";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
  <h1 className="text-2xl font-bold text-green-500">Counter: {count}</h1>
  <div className="flex gap-2">
  <button
    className="bg-red-500 text-white w-20 p-2 rounded"
    onClick={() => dispatch(increment())}
  >
    1
  </button>
  <button
    className="bg-red-500 text-white w-20 p-2 rounded"
    onClick={() => dispatch(decrement())}
  >
    -1
  </button>
  <button
    className="bg-red-500 text-white w-20 p-2 rounded"
    onClick={() => dispatch(incrementByAmount(5))}
  >
    +5
  </button>
  </div>
</div>

  );
}
