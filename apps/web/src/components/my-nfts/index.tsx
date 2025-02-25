import { UserContextProvider } from "@/contexts/user-context";
import { BleuMinter } from "./bleu-minter";
import { NFTList } from "./nft-list";

export function MyNFTs() {
  return (
    <div className="flex-1 p-6 flex flex-col items-center gap-4">
      <UserContextProvider>
        <BleuMinter />
        <NFTList />
      </UserContextProvider>
    </div>
  );
}
