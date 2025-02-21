import { onchainEnum, onchainTable } from "ponder";
import { v4 as uuidv4 } from "uuid";

export const bleuNFT = onchainTable("bleu_nft", (t) => ({
  id: t.bigint().primaryKey(),
  owner: t.text(),
}));

export const stakingType = onchainEnum("type", ["STAKED", "UNSTAKED"]);

export const bleuNFTStaking = onchainTable("bleu_nft_staked", (t) => ({
  id: t
    .text()
    .primaryKey()
    .$default(() => uuidv4()),
  user: t.text().notNull(),
  tokenId: t.bigint().notNull(),
  type: stakingType("type").notNull(),
  timestamp: t.bigint().notNull(),
}));
