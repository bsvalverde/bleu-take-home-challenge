"use client";

import { getGlobalStats } from "@/lib/bleu";
import { formatAddress } from "@/utils/formatAddress";
import { useQuery } from "@tanstack/react-query";
import { LoadingPage } from "../loading-page";

export function Home() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["global-stats"],
    queryFn: () => getGlobalStats(),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!stats) {
    return null; // TODO
  }

  const { staked, unstaked, owners } = stats;

  return (
    <div className="flex-1 p-2 md:p-6 flex flex-col items-center gap-4">
      <div className="flex w-full flex-col md:flex-row justify-around">
        <p>
          <span className="font-medium text-primary">Staked NFTs:</span>{" "}
          {staked.totalCount}
        </p>
        <p>
          <span className="font-medium text-primary">Unstaked NFTs:</span>{" "}
          {unstaked.totalCount}
        </p>
      </div>
      <p className="font-medium text-primary">Top Stakers:</p>
      <ul>
        {owners.items.map(({ id, nftsStaked }, index) => (
          <li key={id}>
            <span className="font-medium">{index + 1}.</span>{" "}
            {formatAddress(id)} ({nftsStaked})
          </li>
        ))}
      </ul>
    </div>
  );
}
