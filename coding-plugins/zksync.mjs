// import web3 and zksync plugin
import { Web3 } from "web3";
import { ZKsyncPlugin, ZKsyncWallet } from "web3-plugin-zksync";

// initialize RPC endpoint
const web3 = new Web3();

// register plugin
web3.registerPlugin(new ZKsyncPlugin("https://sepolia.era.zksync.dev"));

// using the plugin
async function main() {
  // initialize a wallet

  const result = await web3.ZKsync.rpc.getBlockDetails(2000);
  console.log(result);
}

main();
