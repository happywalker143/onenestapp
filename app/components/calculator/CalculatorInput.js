"use client";
import { useState, useEffect } from "react";

export default function CalculatorInput({ label, value, onChange, placeholder }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; // only render on client

    return (
        <div className="flex flex-col space-y-2">
            <label className="font-medium">{label}</label>
            <input
                type="number"
                value={value ?? ""}
                onChange={onChange}
                placeholder={placeholder}
                className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
        </div>
    );
}
