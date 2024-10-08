export const convertTime = (time) => {
  const date = new Date(time);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return formattedDate;
};

export const shortenAddress = (address) =>
  `${address?.slice(0, 8)}...${address?.slice(address.length - 8)}`;

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
