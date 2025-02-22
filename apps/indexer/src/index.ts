import { ponder } from "ponder:registry";
import { nft, stakingEvents } from "ponder:schema";

ponder.on("BleuNFT:Mint", async ({ event, context }) => {
  await context.db.insert(nft).values({
    id: event.args.tokenId,
    owner: event.args.to,
  });
});

ponder.on("BleuStakingContract:Staked", async ({ event, context }) => {
  await Promise.all([
    context.db.update(nft, { id: event.args.tokenId }).set({ staked: true }),
    context.db.insert(stakingEvents).values({
      user: event.args.user,
      tokenId: event.args.tokenId,
      eventType: "STAKED",
      timestamp: event.args.timestamp,
    }),
  ]);
});

ponder.on("BleuStakingContract:Unstaked", async ({ event, context }) => {
  await Promise.all([
    context.db.update(nft, { id: event.args.tokenId }).set({ staked: false }),
    context.db.insert(stakingEvents).values({
      user: event.args.user,
      tokenId: event.args.tokenId,
      eventType: "UNSTAKED",
      timestamp: event.args.timestamp,
    }),
  ]);
});
