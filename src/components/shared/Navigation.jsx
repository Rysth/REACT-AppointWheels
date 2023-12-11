import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
/* prettier-ignore */
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaAngellist,
} from 'react-icons/fa';
import AppointWheelsLogo from '../../assets/icons/AppointWheels.png';
import BurgerMenu from './BurgerMenu';

function Navigation() {
  const [isOpenHome, setIsOpenHome] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleOpenHome = () => setIsOpenHome(!isOpenHome);
  const toggleOpenMenu = () => setIsOpenMenu(!isOpenMenu);

  return (
    <>
      <nav className="w-0 h-0 sm:hidden">
        <BurgerMenu isOpen={isOpenMenu} toggle={toggleOpenMenu} />
        {isOpenMenu && (
        <div className="fixed z-10 w-full py-12 text-black transition-all duration-500 ease-in-out origin-top transform bg-white shadow-xl">
          <ul>
            <li>
              <NavLink
                to="/"
                className="block p-2 pl-4 hover:bg-[var(--green)] hover:text-white text-xl font-bold md:hover:transition "
                onClick={toggleOpenHome}
              >
                Home
              </NavLink>
              {isOpenHome && (
                <ul className="bg-slate-100">
                  <li className="mb-1">
                    <NavLink
                      to="/newcar"
                      className="block p-2 pl-4 hover:bg-[var(--green)] hover:text-white"
                    >
                      Create Car
                    </NavLink>
                  </li>
                  <li className="mb-1">
                    <NavLink
                      to="/deletecar"
                      className="block p-2 pl-4 hover:bg-[var(--green)] hover:text-white"
                    >
                      Delete Car
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <NavLink
                to="/rentals"
                className="block p-2 pl-4 hover:bg-[var(--green)] hover:text-white text-xl font-bold md:hover:transition"
              >
                My Rentals
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/rental/new"
                className="block p-2 pl-4 hover:bg-[var(--green)] hover:text-white text-xl font-bold md:hover:transition"
              >
                New Rental
              </NavLink>
            </li>
          </ul>
        </div>
        )}
      </nav>
      <nav className="hidden sm:block">
        <div className="flex flex-col h-screen py-8 bg-white shadow-xl min-w-[13rem] max-w-[13rem] text-back">
          <picture>
            <img
              src={AppointWheelsLogo}
              alt="AppointWheels Logo"
              className="block bg-cyan-200"
            />
          </picture>
          <ul className="flex flex-col flex-1 pl-4 font-semibold uppercase mt-14">
            <li>
              <NavLink
                to="/"
                activeClassName="bg-[var(--green)]"
                className="block p-2 pl-4 hover:bg-[var(--green)] hover:text-white text-xl font-bold md:hover:transition "
                onClick={toggleOpenHome}
              >
                Home
              </NavLink>
              {isOpenHome && (
                <ul className="bg-slate-100">
                  <li className="mb-1">
                    <NavLink
                      to="/newcar"
                      activeClassName="bg-[var(--green)]"
                      className="block p-2 pl-4 hover:bg-[var(--green)] hover:text-white"
                    >
                      Create Car
                    </NavLink>
                  </li>
                  <li className="mb-1">
                    <NavLink
                      to="/deletecar"
                      activeClassName="bg-[var(--green)]"
                      className="block p-2 pl-4 hover:bg-[var(--green)] hover:text-white"
                    >
                      Delete Car
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <NavLink
                to="/rentals"
                activeClassName="bg-[var(--green)]"
                className="block p-2 pl-4 hover:bg-[var(--green)] hover:text-white text-xl font-bold md:hover:transition"
              >
                My Rentals
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/rental/new"
                activeClassName="bg-[var(--green)]"
                className="block p-2 pl-4 hover:bg-[var(--green)] hover:text-white text-xl font-bold md:hover:transition"
              >
                New Rental
              </NavLink>
            </li>
          </ul>
          <footer>
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
              &copy;&nbsp;
              {new Date().getFullYear()}
              &nbsp;AppointWheels
            </div>
          </footer>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
