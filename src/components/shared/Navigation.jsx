import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaAngellist,
} from 'react-icons/fa';
import AppointWheelsLogo from '../../assets/icons/AppointWheels.png';

function Navigation() {
  const [isOpenHome, setIsOpenHome] = useState(false);
  const [isOpenRentals, setIsOpenRentals] = useState(false);

  const toggleOpenRentals = () => setIsOpenRentals(!isOpenRentals);
  const toggleOpenHome = () => setIsOpenHome(!isOpenHome);

  return (
    <nav className="flex flex-col h-screen px-4 py-8 bg-white border-r-2 w-60 text-back">
      <img src={AppointWheelsLogo} alt="AppointWheels Logo" />
      <ul className="mt-32 font-semibold uppercase">
        <li className="mb-2">
          <NavLink to="/" activeClassName="bg-[var(--green)]" className="block py-1 hover:bg-[var(--green)] hover:text-white text-xl pl-4" onClick={toggleOpenHome}>
            Home
          </NavLink>
          {isOpenHome && (
            <ul className="bg-slate-100">
              <li className="mb-1">
                <NavLink to="/newcar" activeClassName="bg-[var(--green)]" className="block py-1 hover:bg-[var(--green)] hover:text-white pl-4">
                  Create Car
                </NavLink>
              </li>
              <li className="mb-1">
                <NavLink to="/deletecar" activeClassName="bg-[var(--green)]" className="block py-1 hover:bg-[var(--green)] hover:text-white pl-4">
                  Delete Car
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li className="mb-2">
          <NavLink to="/rentals" activeClassName="bg-[var(--green)]" className="block py-1 hover:bg-[var(--green)] hover:text-white text-xl pl-4" onClick={toggleOpenRentals}>
            Rentals
          </NavLink>
          {isOpenRentals && (
            <ul className="bg-slate-100">
              <li className="mb-1">
                <NavLink to="/rentalnew" activeClassName="bg-[var(--green)]" className="block py-1 hover:bg-[var(--green)] hover:text-white pl-4">
                  New Rental
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <div className="flex justify-center mt-auto">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-green-500"
          aria-label="GitHub"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://linkedin.com/in/"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-green-500"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-green-500"
          aria-label="Twitter"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://angel.co/u/"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 hover:text-green-500"
          aria-label="AngelList"
        >
          <FaAngellist size={20} />
        </a>
      </div>
      <div className="mt-4 text-sm text-center text-gray-500">
        &copy; 2023 AppointWheels
      </div>
    </nav>
  );
}

export default Navigation;
