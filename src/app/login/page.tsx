"use client";

import { Button } from "@/components/ui/button";
import {
  DynamicConnectButton,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import { useRef } from "react";

export default function LoginPage() {
  const { sdkHasLoaded, user, handleLogOut } = useDynamicContext();
  const btnRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-28 bg-[#121212] text-white">
      <h1 className="text-center text-3xl font-bold">
        Turn your daily life
        <br /> into treasure hunt
      </h1>

      <div className="sr-only">
        <DynamicConnectButton>
          <div ref={btnRef}></div>
        </DynamicConnectButton>
      </div>

      {!user ? (
        <Button
          style={{
            background: "linear-gradient(180deg, #D5FC44 0%, #A9D600 100%)",
          }}
          className="flex h-auto w-3/4 rounded-full py-3 text-2xl font-bold text-black"
          disabled={!sdkHasLoaded}
          onClick={() => btnRef.current?.click()}
        >
          Sign up
        </Button>
      ) : (
        <Button
          style={{
            background: "linear-gradient(180deg, #D5FC44 0%, #A9D600 100%)",
          }}
          className="flex h-auto w-3/4 rounded-full py-3 text-2xl font-bold text-black"
          disabled={!sdkHasLoaded}
          onClick={() => handleLogOut()}
        >
          Sign out
        </Button>
      )}
    </div>
  );
}
