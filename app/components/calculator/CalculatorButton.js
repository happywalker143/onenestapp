"use client";

export default function CalculatorButton({ onClick, children }) {
    return (
        <button
            onClick={onClick}
            className="
        w-full 
        bg-gradient-to-r from-purple-800 via-indigo-400 to-purple-800 
        text-white font-bold py-2 rounded 
        hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-600 
        transition cursor-pointer
    "
        >
            {children}
        </button>
    );
}
