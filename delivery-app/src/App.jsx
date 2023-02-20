import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import LogoTrans from "/images/pin-logo-trans.png";

function App() {
  const [nav, setNav] = useState(false);
  function handleNav() {
    setNav(!nav);
  }
  return (
    <div className="wrapper">
      {/* Navbar full screen */}
      <div className=" bg-slate-100 fixed top-0 w-full h-24 shadow-xl z-[100] pt=4">
        <div className="flex justify-between items-center w-full h-full px-4 2xl:px-16">
          <img src={LogoTrans} alt="" width="170" height="50" />
          <nav>
            <ul className="hidden md:flex">
              <li className="ml-10 text-sm uppercase hover:border-b hover:text-[#FF7F50] ease-in duration-300">
                Home
              </li>
              <li className="ml-10 text-sm uppercase hover:border-b hover:text-[#FF7F50] ease-in duration-300">
                Active
              </li>
              <li className="ml-10 text-sm uppercase hover:border-b hover:text-[#FF7F50] ease-in duration-300">
                Completed
              </li>
            </ul>
            <div onClick={handleNav} className="md:hidden cursor-pointer">
              <AiOutlineMenu size={35} />
            </div>
          </nav>
        </div>
      </div>
      {/* Popout Menu */}
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#1f2937] p-10 ease-in duration-500"
            : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
        }
      >
        <div className="flex w-full items-center justify-between">
        <img src={LogoTrans} alt="" width="87" height="35"/>
        </div>
      </div>
    </div>
  );
}

export default App;
