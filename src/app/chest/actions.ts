"use server";
import ethers from 'ethers';
import { abi } from '@/config/abi';

const contractAddress = "0x7CC3922213136A7Ce8467eCB02FdF4135D5d400F"
const tokenAddress = "0xe77C75Ec925b36A3F2AF8a1fc62769e5ef8201cA"
const price = 0.001711
export const getRandomAirdrop = async (walletAddress: string) => {
  if (!walletAddress) {
    return null;
  }
  const randomNumber = Math.floor(Math.random() * 1000000);
  const provider = await new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_BASE_URI!)
  const wallet = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY!, provider)
  const contract = new ethers.Contract(contractAddress, abi, wallet)
  const airdrop = await contract.distribute(walletAddress, tokenAddress, randomNumber)
  console.log(airdrop)
  return {
    value: randomNumber,
    amount: randomNumber * price,
    image:
      "https://assets.coingecko.com/coins/images/39251/standard/miggles.jpg?1721283044",
  };
};
