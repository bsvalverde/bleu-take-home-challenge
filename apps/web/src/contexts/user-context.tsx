"use client";

import { Loader } from "lucide-react";
import React, { createContext } from "react";
import { useConnectorClient } from "wagmi";

export const userContext = createContext<{ userAddress: `0x${string}` }>({
  userAddress: "0xabc",
});

export function UserContextProvider({ children }: React.PropsWithChildren) {
  const { data, isPending } = useConnectorClient();

  if (isPending) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  const userAddress = data?.account.address;

  if (!userAddress) {
    return null;
  }

  return (
    <userContext.Provider value={{ userAddress }}>
      {children}
    </userContext.Provider>
  );
}
