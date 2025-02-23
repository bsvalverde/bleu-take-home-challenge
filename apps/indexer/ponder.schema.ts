import { onchainEnum, onchainTable } from "ponder";
import { v4 as uuidv4 } from "uuid";

export const nft = onchainTable("nft", (t) => ({
  id: t.bigint().primaryKey(),
  owner: t.text(),
  staked: t.boolean().default(false),
  stakedAt: t.bigint(),
}));

export const stakingType = onchainEnum("staking_type", ["STAKED", "UNSTAKED"]);

export const stakingEvent = onchainTable("staking_event", (t) => ({
  id: t
    .text()
    .primaryKey()
    .$default(() => uuidv4()),
  user: t.text().notNull(),
  tokenId: t.bigint().notNull(),
  eventType: stakingType("staking_type").notNull(),
  timestamp: t.bigint().notNull(),
}));
