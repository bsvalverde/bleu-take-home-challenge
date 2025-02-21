import { ponder } from "ponder:registry";
import { bleuNFT, bleuNFTStaking } from "ponder:schema";

ponder.on("BleuNFT:Mint", async ({ event, context }) => {
  const { client, contracts } = context;
  const { BleuNFT } = contracts;

  const owner = await client.readContract({
    abi: BleuNFT.abi,
    address: BleuNFT.address,
    functionName: "ownerOf",
    args: [event.args.tokenId],
  });

  await context.db.insert(bleuNFT).values({
    id: event.args.tokenId,
    owner,
  });
});

ponder.on("BleuStakingContract:Staked", async ({ event, context }) => {
  await context.db.insert(bleuNFTStaking).values({
    user: event.args.user,
    tokenId: event.args.tokenId,
    type: "STAKED",
    timestamp: event.args.timestamp,
  });
});

ponder.on("BleuStakingContract:Unstaked", async ({ event, context }) => {
  await context.db.insert(bleuNFTStaking).values({
    user: event.args.user,
    tokenId: event.args.tokenId,
    type: "UNSTAKED",
    timestamp: event.args.timestamp,
  });
});
