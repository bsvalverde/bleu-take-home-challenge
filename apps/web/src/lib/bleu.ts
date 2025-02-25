"use server";

import { GetGlobalStatsResponse, GetUserNFTResponse } from "@/types/bleu";
import axios from "axios";

const bleu = axios.create({ baseURL: process.env.INDEXER_URL });

export async function getGlobalStats() {
  const {
    data: { data },
  } = await bleu.post<GetGlobalStatsResponse>("", {
    query: `{
      staked:nfts(where: {staked: true}) {
        totalCount
      }
      unstaked:nfts(where: {staked: false}) {
        totalCount
      }
      owners(limit: 10, orderBy: "nftsStaked", orderDirection: "desc") {
        items {
          id
          nftsStaked
        }
      }
    }`,
  });

  return data;
}

export async function getUserNFTs(user: string) {
  const {
    data: { data },
  } = await bleu.post<GetUserNFTResponse>("", {
    query: `{
      nfts (where: {owner: "${user}"}) {
        items {
          id
          owner
          staked
          stakedAt
        }
        totalCount
      }
    }`,
  });

  return data;
}
