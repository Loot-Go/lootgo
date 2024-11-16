"use client";
import CoinCard from "@/components/market/coin-card";
import Percentage from "@/components/market/percentage";
import Transaction from "@/components/market/transactions";
import { Avatar, Badge, Identity, Name } from "@coinbase/onchainkit/identity";
import { SpinnerIcon, useUserWallets } from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import { useEffect, useState } from "react";

type Coin = {
  price: number;
  image: string;
  marketCap: number;
  symbol: string;
};

const Tabs = ({
  onClick,
  label,
  active,
}: {
  onClick: () => void;
  label?: string;
  active?: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-full cursor-pointer py-3 text-center ${active ? "border-b-4 border-black font-semibold text-lime-500" : "text-white"} `}
    >
      {label}
    </div>
  );
};

const ChestPage = () => {
  const userWallets = useUserWallets();
  const wallet = userWallets?.[0]?.address;
  const [tab, setTab] = useState("Portfolio");
  const [tokens, setTokens] = useState([]);
  const [tokenError, setTokenError] = useState<null | string>(null);

  useEffect(() => {
    const fetchTokenDetails = async () => {
      setTokenError(null);

      try {
        const response = await axios.get(
          `/api/user_tokens?wallet_address=0x568b9bFfF4a3a7C7351db84EC2F4Ad4CA147A1D0`,
        );
        setTokens(response.data);
        console.log(response.data);
      } catch (err) {
        setTokenError("Failed to fetch token details");
        console.error("Error fetching token details:", err);
      }
    };

    if (wallet) {
      fetchTokenDetails();
    }
  }, [wallet]);

  return (
    <div className={`min-h-screen bg-[#121212] text-white`}>
      <div className="relative mx-auto max-w-[90%]">
        <div
          className="absolute top-0 -mt-5 h-32 w-full animate-pulse bg-lime-700 blur-2xl"
          style={{
            transitionDuration: "10000ms",
          }}
        ></div>

        <div className="relative z-10 grid place-items-center pt-16 text-center">
          {/* <div className="text-2xl font-bold">Market</div> */}

          {/* <img
            className="h-28 w-28 rounded-full"
            src="https://pbs.twimg.com/profile_images/1837364972952899588/hyM5PUN3_400x400.jpg"
          />

          <div className="mb-1 mt-3 max-w-20 truncate text-center">
            0x46251894d74711cecb7E845B444290918D123F07
          </div> */}
          {wallet ? (
            <Identity
              className="my-5"
              address={wallet as `0x${string}`}
              schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
            >
              <Avatar />
              <Name className="ml-5">
                <Badge />
              </Name>
            </Identity>
          ) : null}

          <div className="text-3xl font-black">$3,291</div>

          <Percentage percentage="91%" />

          <div className="flex flex-col items-center">
            <img
              src="/add_cash.png"
              className="mt-10 h-[40px] w-[40px]"
              alt=""
            />
            <div className="mt-2 text-center">Add Cash</div>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-between px-2">
            <b>Cash $1,200</b>
            <img
              src="/plus.png"
              className="h-[40px] w-[40px] rounded-full"
              alt=""
            />
          </div>

          <div className="mt-5 space-y-5 px-2">
            <div className="grid grid-cols-2 place-items-center border-b">
              <Tabs
                onClick={() => setTab("Portfolio")}
                label="Portfolio"
                active={tab === "Portfolio"}
              />
              <Tabs
                onClick={() => setTab("History")}
                active={tab === "History"}
                label="History"
              />
            </div>
            {tab === "Portfolio" && (
              <>
                {tokens.length > 0 ? (
                  <>
                    <CoinCard />
                    {!tokenError &&
                      tokens.map((t: Coin, index) => (
                        <CoinCard
                          key={index}
                          logo={t.image}
                          price={t.price}
                          marketCap={t.marketCap}
                          symbol={t.symbol}
                        />
                      ))}
                  </>
                ) : (
                  <div className="flex h-52 w-full items-center justify-center">
                    <SpinnerIcon className="h-10 w-10 animate-spin" />
                  </div>
                )}
              </>
            )}
            {tab === "History" && (
              <>
                <Transaction />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChestPage;
