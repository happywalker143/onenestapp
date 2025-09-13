"use client";
import { FaChevronDown, FaChevronUp, FaChevronRight, FaChevronLeft } from "react-icons/fa";

import Link from "next/link";
import { useState } from "react";

function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setOpenSubMenu(null); // main menu badalta tar sub-menu reset
  };

  const toggleSubMenu = (submenu) => {
    setOpenSubMenu(openSubMenu === submenu ? null : submenu);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-800 p-4 shadow-lg flex justify-around">
        <div className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          onenest
        </div>

        <nav>
          <ul className="flex gap-4">
            {/* Calculator */}
            <li className="relative">
              <button
                onClick={() => toggleMenu("calculator")}
                className="bg-blue-400 py-2 px-3 rounded-[5px] text-white hover:bg-blue-500"
              >
                Calculator
              </button>

              {openMenu === "calculator" && (
                <ul className="absolute left-0 top-full mt-1 bg-blue-800 text-white rounded shadow-lg w-30">
                  {/* Loan */}
                  <li className="relative text-center">
                    <button
                      onClick={() => toggleSubMenu("loan")}
                      className="w-full flex items-center justify-between px-4 py-2 hover:bg-blue-500"
                    >
                      <span>Loan</span>
                      <span>
                        {openSubMenu === "loan" ? (
                          <FaChevronDown size={12} />
                        ) : (
                          <FaChevronRight size={12} />
                        )}
                      </span>
                    </button>

                    {openSubMenu === "loan" && (
                      <ul className="absolute left-full top-0 ml-1 bg-blue-700 w-48 rounded shadow-lg">
                        <li className="px-4 py-2 hover:bg-blue-500">
                          <Link href="/calculator/loan">Loan Calculator</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500 capitalize">
                          <Link href="/calculator/interest">Interest</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500 capitalize">
                          <Link href="/calculator/mortgage">Mortgage</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500 capitalize">
                          <Link href="/calculator/payment">Payment</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500 capitalize">
                          <Link href="/calculator/inflation">Inflation</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500 capitalize">
                          <Link href="/calculator/compound">Compound Interest</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500 capitalize">
                          <Link href="/calculator/sales">Sales Tax</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500 capitalize">
                          <Link href="/calculator/income">Income Tax</Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* Health */}
                  <li className="relative text-center">
                    <button
                      onClick={() => toggleSubMenu("health")}
                      // className="w-full text-left px-4 py-2 hover:bg-blue-500"
                      className="w-full flex items-center justify-between px-4 py-2 hover:bg-blue-500"
                    >

                      <span>Health</span>
                      <span>
                        {openSubMenu === "health" ? (
                          <FaChevronDown size={12} />
                        ) : (
                          <FaChevronRight size={12} />
                        )}
                      </span>
                    </button>
                    {openSubMenu === "health" && (
                      <ul className="absolute left-full top-0 ml-1 bg-blue-700 w-48 rounded shadow-lg">
                        <li className="px-4 py-2 hover:bg-blue-500">
                          <Link href="/calculator/bmi">BMI Calculator</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500">
                          <Link href="/calculator/calories">Calories</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500">
                          <Link href="/calculator/bodyFat">Body Fat Calculator</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500">
                          <Link href="/calculator/bmr">BMR Calculator</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500">
                          <Link href="/calculator/idealWeight">Ideal Weight</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500">
                          <Link href="/calculator/dueDate">Due Date</Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* Other */}
                  <li className="relative">
                    <button
                      onClick={() => toggleSubMenu("other")}
                      // className="w-full text-left px-4 py-2 hover:bg-blue-500"
                      className="w-full flex items-center justify-between px-4 py-2 hover:bg-blue-500"
                    >

                      <span>other</span>
                      <span>
                        {openSubMenu === "health" ? (
                          <FaChevronDown size={12} />
                        ) : (
                          <FaChevronRight size={12} />
                        )}
                      </span>
                    </button>
                    {openSubMenu === "other" && (
                      <ul className="absolute left-full top-0 ml-1 bg-blue-700 w-48 rounded shadow-lg">
                        <li className="px-4 py-2 hover:bg-blue-500">
                          <Link href="/calculator/age">Age Calculator</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500">
                          <Link href="/calculator/date">Date Calculator</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500">
                          <Link href="/calculator/time">Time Calculator</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500">
                          <Link href="/calculator/cgpa">CGPA Calculator</Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-500">
                          <Link href="/calculator/grade">Grade Calculator</Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
export default Header;