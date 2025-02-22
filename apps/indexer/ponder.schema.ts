import { onchainEnum, onchainTable } from "ponder";
import { v4 as uuidv4 } from "uuid";

export const nft = onchainTable("nft", (t) => ({
  id: t.bigint().primaryKey(),
  owner: t.text(),
  staked: t.boolean().default(false),
  stakedAt: t.timestamp(),
}));

export const stakingType = onchainEnum("stakingType", ["STAKED", "UNSTAKED"]);

export const stakingEvents = onchainTable("staking_events", (t) => ({
  id: t
    .text()
    .primaryKey()
    .$default(() => uuidv4()),
  user: t.text().notNull(),
  tokenId: t.bigint().notNull(),
  eventType: stakingType("stakingType").notNull(),
  timestamp: t.bigint().notNull(),
}));
