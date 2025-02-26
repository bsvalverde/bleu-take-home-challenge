"use client";

import { Button } from "@/components/ui/button";
import { formatAddress } from "@/utils/formatAddress";
import { ConnectKitButton } from "connectkit";

export const ConnectWalletButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ show, isConnected, address }) => (
        <Button onClick={show} type="button" className="py-2 px-4 rounded-lg">
          {isConnected && address ? formatAddress(address) : "Connect Wallet"}
        </Button>
      )}
    </ConnectKitButton.Custom>
  );
};
