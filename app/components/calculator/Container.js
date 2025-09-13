"use client";

export default function Container({ children }) {
  return (
    <div className="min-h-screen  mx-10 flex justify-center items-start p-6 sm:p-10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 rounded-2xl">
      <div className="w-full max-w-3xl">{children}</div>
    </div>
  );
}
