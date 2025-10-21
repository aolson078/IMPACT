import { providers, Wallet } from "ethers";
import {
  FlashbotsBundleProvider,
  FlashbotsBundleResolution,
} from "@flashbots/ethers-provider-bundle";
import { ChainDisconnectedError } from "viem";

const GWEI = 10n ** 9n;
const ETHER = 10n ** 18n;

const CHAIN_ID = 137;

const provider = new providers.JsonRpcProvider({
  url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
});
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

async function main() {
  const signer = new Wallet(
    "0x2000000000000000000000000000000000000000000000000000000000000000"
  );

  const flashbot = await FlashbotsBundleProvider.create(
    provider,
    signer,
    FLASHBOTS_ENDPOINT
  );

  provider.on("block", async (block) => {
    console.log("Block", `${block}`);

    const signedTx = await flashbot.signBundle([
      {
        signer: wallet,
        transaction: {
          chainId: CHAIN_ID,
          type: 2,
          maxFeePerGas: GWEI * 3n,
          maxPriorityFeePerGas: GWEI * 2n,
          gasLimit: 1000000,
          value: 0,
          data: "0x",
          to: "0x26C4ca3462491695119104d52a2731b238942b32",
        },
      },
    ]);
    const targetBlock = block + 1;
    const sim = await flashbot.simulate(signedTx, targetBlock);

    if ("error" in sim) {
      console.log(`Simulation error: ${sim.error.message}`);
    } else {
      console.log(`Simulation successful`);
    }

    const res = await flashbot.sendRawBundle(signedTx, targetBlock);
    if ("error" in res) {
      throw new Error(`Send bundle error: ${res.error.message}`);
    }

    const bundleResolution = await res.wait();
    if (bundleResolution === FlashbotsBundleResolution.BundleIncluded) {
      console.log(`Bundle included`);
      console.log(JSON.stringify(sim, null, 2));
    } else if (
      bundleResolution ===
      FlashbotsBundleResolution.BundlePassedWithoutInclusion
    ) {
      console.log(`Bundle not included`);
    } else if (
      bundleResolution === FlashbotsBundleResolution.AccountNonceTooHigh
    ) {
      console.log(`Account nonce too high, bailing`);
      process.exit(1);
    }
  });
}

main();
