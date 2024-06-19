import { NFT } from "@/constants/NFT";

  // Helper function to generate a random string of a given length
  const randomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  };


// Helper function to generate a random image URL
const randomImageUrl = (id: number) => `https://picsum.photos//200?random=${id}`;
  
  // Helper function to generate a random Ethereum address
  const randomAddress = () => `0x${randomString(40)}`;
  
  // Function to generate a mock NFT
  const generateMockNFT = (id: number): NFT => ({
    id,
    asset: {
      name: `NFT #${id}`,
      id: `asset_${id}`,
      image: randomImageUrl(id),
      description: `Description of NFT #${id}`
    },
    buyoutCurrencyValuePerToken: {
      displayValue: (Math.random() * 10).toFixed(2),
      symbol: 'tRBTC'
    },
    sellerAddress: randomAddress()
  });
  
  // Generate a map of 9 NFT elements
  const generateNFTs = (count: number): Array<NFT> => {
    const nftMap = new Array<NFT>();
    for (let i = 1; i <= count; i++) {
      nftMap.push(generateMockNFT(i));
    }
    return nftMap;
  };

  export default generateNFTs;