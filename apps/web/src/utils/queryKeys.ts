export function getQueryKeyForGlobalStats() {
  return ["global-stats"];
}

export function getQueryKeyForUserNFTList(user: string) {
  return ["nftList", user];
}
