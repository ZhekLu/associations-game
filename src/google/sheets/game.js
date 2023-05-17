export async function getNextGameId() {
  return Date.now().toString(36).slice(-4);
}
