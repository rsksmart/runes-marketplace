
export type Token = {
  id: number;
  asset: {
    name: string;
    id: string;
    description: string;
    image: string;
  };
  buyoutCurrencyValuePerToken: {
    displayValue: string;
    symbol: string;
  };
  sellerAddress: string;
};


// Helper function to generate a random string of a given length
const randomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length)),
  ).join("");
};

// Helper function to generate a random image URL
const randomImageUrl = (id: number) =>
  `https://picsum.photos//200?random=${id}`;

// Helper function to generate a random Ethereum address
const randomAddress = () => `0x${randomString(40)}`;

// Function to generate a mock Token
const generateMockToken = (id: number): Token => ({
  id,
  asset: {
    name: `Token #${id}`,
    id: `asset_${id}`,
    image: randomImageUrl(id),
    description: `Description of Token #${id}`,
  },
  buyoutCurrencyValuePerToken: {
    displayValue: (Math.random() * 10).toFixed(2),
    symbol: "tRBTC",
  },
  sellerAddress: randomAddress(),
});

export const generateTokens = (count: number): Array<Token> => {
  const tokenMap = new Array<Token>();
  for (let i = 1; i <= count; i++) {
    tokenMap.push(generateMockToken(i));
  }
  return tokenMap;
};
