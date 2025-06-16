import React from "react";
import { NavLink } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white mb-10">
      <nav className="max-w-6xl mx-auto flex justify-center items-center h-24 px-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `mx-8 text-lg font-medium ${
              isActive ? "text-indigo-400" : "text-gray-300 hover:text-white"
            }`
          }
        >
          Головна
        </NavLink>
        <NavLink
          to="/test-heroes"
          className={({ isActive }) =>
            `mx-8 text-lg font-medium ${
              isActive ? "text-indigo-400" : "text-gray-300 hover:text-white"
            }`
          }
        >
          Тестова
        </NavLink>
        <NavLink
          to="/create-hero"
          className={({ isActive }) =>
            `mx-8 text-lg font-medium ${
              isActive ? "text-indigo-400" : "text-gray-300 hover:text-white"
            }`
          }
        >
          Створення
        </NavLink>
      </nav>
    </header>
  );
};
