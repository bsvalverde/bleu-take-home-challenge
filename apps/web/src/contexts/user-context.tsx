"use client";

import React, { createContext } from "react";
import { useConnectorClient } from "wagmi";

export const userContext = createContext<{ userAddress: `0x${string}` }>({
  userAddress: "0xabc",
});

export function UserContextProvider({ children }: React.PropsWithChildren) {
  const { data } = useConnectorClient();

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
