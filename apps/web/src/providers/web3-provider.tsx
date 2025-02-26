"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import type { ReactNode } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { anvil } from "wagmi/chains";

const walletConnectProjectId = "";

const config = createConfig(
  getDefaultConfig({
    chains: [anvil],
    transports: {
      [anvil.id]: http(),
    },

    // Required API Keys
    walletConnectProjectId,

    // Required App Info
    appName: "Next Bleu Starter",
    // Optional App Info
    appDescription: "Template for web3 next projects",
    appUrl: "http://localhost:3000",
    appIcon: "https://cdn-icons-png.flaticon.com/128/4064/4064205.png",
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
