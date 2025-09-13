"use client";

export default function CalculatorLayout({ title, children }) {
    return (
        <div className="w-full bg-gray-800 shadow-lg rounded-2xl p-6 space-y-6 text-white">
            {title && <h2 className="text-2xl font-bold text-center">{title}</h2>}
            {children}
        </div>
    );
}
