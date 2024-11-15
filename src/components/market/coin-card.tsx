import Link from "next/link";
import Percentage from "./percentage";

const CoinCard = () => {
  return (
    <Link
      href="/details/1"
      className="flex items-center justify-between rounded-2xl bg-[#484D58] p-2"
    >
      <div className="flex w-full items-center">
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/64x64/74.png"
          className="h-[40px] w-[40px]"
          alt=""
        />
        <div className="ml-4 flex-1">
          <div className="flex justify-between font-bold">
            <span>$DOE</span>
            <b>$1,40</b>
          </div>

          <div className="flex justify-between">
            <span>$2.0B M.Cap</span>
            <Percentage percentage="91%" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;
