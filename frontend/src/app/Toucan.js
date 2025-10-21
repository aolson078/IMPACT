import ToucanClient from "toucan-sdk";
import { JsonRpcProvider, Wallet } from "ethers";

const provider = new JsonRpcProvider("https://rpc.ankr.com/polygon");
const signer = new Wallet(process.env.PRIVATE_KEY, provider);

const toucan = new ToucanClient("polygon", provider, signer);

const cUSD = "0x765DE816845861e75A25fCA122bb6898B8B1282a";
const tx = await toucan.autoOffsetExactInToken(cUSD, "NCT", parseEther("0.01"));

// display carbon credit price
const bct = "0x2F800Db0fdb5223b3C3f354886d907A671414A7F";

// dispaly amount of bct in current wallet

// display amount of carbon credits retired
