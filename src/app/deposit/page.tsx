"use client";

import { useUserWallets } from "@/lib/dynamic";
import { FundButton, getOnrampBuyUrl } from "@coinbase/onchainkit/fund";
import { ArrowLeftIcon, CopyIcon } from "lucide-react";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { QRCode } from "react-qrcode-logo";
import { toast } from "sonner";

const DepositPage = () => {
  const userWallets = useUserWallets();
  const projectId = process.env.NEXT_PUBLIC_CDP_API_KEY!;
  const userWallet = userWallets[0]?.address;

  const onrampBuyUrl = getOnrampBuyUrl({
    projectId,
    addresses: { [userWallet]: ["base"] },
    assets: ["USDC"],
    presetFiatAmount: 20,
    fiatCurrency: "USD",
  });

  return (
    <div className="min-h-screen bg-[#000] text-white">
      <div className="relative flex items-center justify-center">
        <Link href="/market" className="absolute left-5 top-6">
          <ArrowLeftIcon className="h-4 w-4 cursor-pointer" />
        </Link>
        <div className="pt-5 text-center font-bold">Deposit</div>
      </div>
      <div className="grid min-h-screen place-items-center pt-5 text-center">
        {userWallets[0]?.address ? (
          <div>
            <p className="text-xl">Send USDC on Base</p>
            <section className="mt-5 flex justify-center">
              <div className="w-min rounded-2xl bg-white p-4">
                <QRCode
                  value={userWallets[0]?.address ?? ""}
                  logoImage="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
                  logoWidth={32}
                  logoHeight={32}
                  logoPadding={3}
                />
              </div>
            </section>

            <div className="mt-5 flex flex-col items-center justify-between">
              <p>Wallet address (Base)</p>
              <p className="mt-2 flex items-center gap-2 text-xs">
                {userWallets[0]?.address ?? ""}
                <CopyToClipboard
                  text={`0x`}
                  onCopy={() => {
                    toast.success("Copied to clipboard");
                  }}
                >
                  <CopyIcon className="h-4 w-4 cursor-pointer" />
                </CopyToClipboard>
              </p>
            </div>
          </div>
        ) : (
          <>
            <div>Loading...</div>
          </>
        )}

        <FundButton fundingUrl={onrampBuyUrl} />
      </div>
    </div>
  );
};

export default DepositPage;
