import { ponder } from "ponder:registry";
import { nft, owner, stakingEvent } from "ponder:schema";

ponder.on("BleuNFT:Mint", async ({ event, context }) => {
  await context.db.insert(nft).values({
    id: event.args.tokenId,
    owner: event.args.to,
  });
  await context.db
    .insert(owner)
    .values({
      id: event.args.to,
    })
    .onConflictDoUpdate((row) => ({
      nftsUnstaked: row.nftsUnstaked + 1,
    }));
});

ponder.on("BleuStakingContract:Staked", async ({ event, context }) => {
  await Promise.all([
    context.db
      .update(nft, { id: event.args.tokenId })
      .set({ staked: true, stakedAt: event.args.timestamp }),
    context.db.insert(stakingEvent).values({
      user: event.args.user,
      tokenId: event.args.tokenId,
      eventType: "STAKED",
      timestamp: event.args.timestamp,
    }),
    context.db.update(owner, { id: event.args.user }).set((row) => ({
      nftsStaked: row.nftsStaked + 1,
      nftsUnstaked: row.nftsUnstaked - 1,
    })),
  ]);
});

ponder.on("BleuStakingContract:Unstaked", async ({ event, context }) => {
  await Promise.all([
    context.db
      .update(nft, { id: event.args.tokenId })
      .set({ staked: false, stakedAt: null }),
    context.db.insert(stakingEvent).values({
      user: event.args.user,
      tokenId: event.args.tokenId,
      eventType: "UNSTAKED",
      timestamp: event.args.timestamp,
    }),
    context.db.update(owner, { id: event.args.user }).set((row) => ({
      nftsStaked: row.nftsStaked - 1,
      nftsUnstaked: row.nftsUnstaked + 1,
    })),
  ]);
});
