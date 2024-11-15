"use client";

import confetti from "canvas-confetti";
import { useState } from "react";

const ChestPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${
        isOpen
          ? "bg-[#FF9900]"
          : "bg-gradient-to-r from-[#EAA928] to-[#E7A218] via-[#FAD96B] "
      }`}
    >
      <div className="grid place-items-center  items-center h-full min-h-screen">
        <div className="space-y-20 flex flex-col items-center">
          <div className="flex">
            <img
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/74.png"
              className="w-[80px] h-[80px]"
            />
            <div className="flex flex-col items-center space-y-2 flex-1 ml-2">
              <b className="text-white text-6xl font-extrabold">x 53,000</b>
              <p className="text-white font-bold text-xl">($1)</p>
            </div>
          </div>
          <img
            src={isOpen ? "/chest_open.png" : "/chest.png"}
            alt="chest"
            className="w-[250px] h-[250px]"
          />

          <button
            onClick={() => {
              setIsOpen(true);
              confetti({
                particleCount: 450,
              });
            }}
            className="bg-gradient-to-t p-5  from-[#A9D600] to-[#D5FC44] rounded-full shadow-lg px-5 min-w-[200px] font-bold"
          >
            {isOpen ? "COLLECT" : "OPEN CHEST"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChestPage;
