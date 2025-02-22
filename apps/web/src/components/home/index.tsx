import { UserContextProvider } from "@/contexts/user-context";
import { BleuMinter } from "./bleu-minter";
import { NFTList } from "./nft-list";

export function Home() {
  return (
    <UserContextProvider>
      <BleuMinter />
      <NFTList />
    </UserContextProvider>
  );
}
