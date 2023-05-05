import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../assets/logo.png";

const NavbarItem = ({ title, classProps }) => (
  <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>
);
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="w-full flex md:justify-center justify-between items-center p-2">
      <div className="md:flex-[0.5] flex-initial justify-between items-center">
        <img src={logo} alt="logo" className="w-[30px] h-[30px] bg-white" />
        <p className="font-bold text-white">KryptPush</p>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Tutorials", "Wallets"].map(
          (menuItem, index) => (
            <NavbarItem title={menuItem} key={index} />
          )
        )}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white cursor-pointer md:hidden"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white cursor-pointer md:hidden"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul className="z-10 top-0 -right-2 fixed p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end animate-slide-in glassMorph">
            <li className="text-xl w-full my-2">
              <AiOutlineClose
                fontSize={22}
                className="text-white cursor-pointer md:hidden"
                onClick={() => setToggleMenu(false)}
              />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (menuItem, index) => (
                <NavbarItem
                  title={menuItem}
                  key={index}
                  classProps="my-2 text-lg text-white"
                />
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
