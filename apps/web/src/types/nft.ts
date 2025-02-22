export type NFT = {
  id: string;
  owner: `0x${string}`;
} & (
  | {
      staked: true;
      stakedAt: Date;
    }
  | {
      staked: false;
      stakedAt: null;
    }
);
