"use server";

import { GetUserNFTResponse } from "@/types/bleu";
import axios from "axios";

const bleu = axios.create({ baseURL: "http://localhost:42069" });

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
