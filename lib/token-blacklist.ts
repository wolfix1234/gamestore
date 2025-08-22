const blacklistedTokens = new Set<string>();

export function addTokenToBlacklist(token: string): void {
  blacklistedTokens.add(token);
}

export function isTokenBlacklisted(token: string): boolean {
  return blacklistedTokens.has(token);
}

export function clearBlacklist(): void {
  blacklistedTokens.clear();
}