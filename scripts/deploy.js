const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Choose USDC/USD feed address: env override or per-network default
  const networkName = hre.network.name;
  const FEEDS = {
    // Polygon mainnet
    polygon: "0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7",
    // Add your Amoy feed here if desired or pass via env
    amoy: process.env.USDC_USD_FEED || undefined,
  };

  const usdcUsdFeed =
    process.env.USDC_USD_FEED || FEEDS[networkName] || FEEDS.polygon;

  if (!usdcUsdFeed) {
    throw new Error(
      `USDC_USD_FEED not set for network "${networkName}". Set env USDC_USD_FEED.`
    );
  }

  // Deploy on-chain oracle contract
  const Oracle = await hre.ethers.getContractFactory("BctUsdOracle");
  const oracle = await Oracle.deploy(usdcUsdFeed);
  await oracle.waitForDeployment();
  const oracleAddress = await oracle.getAddress();
  console.log("BctUsdOracle deployed:", oracleAddress);

  // Save to frontend deployed addresses
  const outPath = path.join(
    __dirname,
    "..",
    "frontend",
    "deployed-addresses.json"
  );
  let current = {};
  try {
    current = JSON.parse(fs.readFileSync(outPath, "utf8"));
  } catch (_) {}
  current.polygon = current.polygon || {};
  if (networkName === "polygon") {
    current.polygon.bctOracle = oracleAddress;
  } else {
    // For other networks, still record under a key matching the network
    current[networkName] = current[networkName] || {};
    current[networkName].bctOracle = oracleAddress;
  }
  fs.writeFileSync(outPath, JSON.stringify(current, null, 2));
  console.log("Saved oracle address to frontend/deployed-addresses.json");

  // Optionally also emit .env examples
  console.log(
    `\nSet these if you prefer envs:\nPOLYGON_BCT_ORACLE=${oracleAddress}\nNEXT_PUBLIC_BCT_ORACLE=${oracleAddress}`
  );

  console.log("Done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
