import { NFT } from "@/types/nft";

interface Props {
  nft: NFT;
}

export function NFTListItem({ nft }: Props) {
  // const { userAddress } = useContext(userContext);

  const { id } = nft;

  return <li>id: {id}</li>;
}
