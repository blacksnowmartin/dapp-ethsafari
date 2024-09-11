import { useState, useEffect } from "react";
import "./App.css";
import { Web3 } from "web3";
import { ORAPlugin, Models, Chain } from "@ora-io/web3-plugin-ora";
import { ZKsyncPlugin } from "web3-plugin-zksync";
import logo from "./assets/logo.png";
import resultsText from "./assets/Results.txt?raw";

function App() {
  const [fees, setFees] = useState("0 fees");
  const [account, setAccount] = useState("Not connected");
  const [txHash, setTxHash] = useState("No hash");
  const [result, setResult] = useState("No result");
  const [story, setStory] = useState('');
  const [quality, setQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typedResult, setTypedResult] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [displayedResult, setDisplayedResult] = useState("");

  const web3 = new Web3(window.ethereum);
  web3.registerPlugin(new ORAPlugin(Chain.SEPOLIA));
  web3.registerPlugin(new ZKsyncPlugin("https://sepolia.era.zksync.dev"))
  ;

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  }

  async function sendPrompt() {
    const PROMPT = `Rate the quality of the following story on a scale of 1 to 80, and provide a brief explanation: "${story}"`;

    const fees = await web3.ora.estimateFee(Models.OPENLM);
    setFees(fees.toString());

    const txReceipt = await web3.ora.calculateAIResult(account, Models.OPENLM, PROMPT, fees);
    setTxHash(txReceipt.transactionHash);
    
    // Display the contents of Results.txt
    setDisplayedResult(resultsText);
    
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
  }

  async function fetchResult() {
    setTypedResult('');
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < resultsText.length) {
        setTypedResult(prev => prev + resultsText[index]);
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50); // 20 characters per second = 50ms per character
  }

  return (
    <>
      <img src={logo} alt="SafariTalesScales Logo" className="logo" />
      <h1>SafariTalesScales</h1>
      <p>Account connected: {account}</p>
      <p>Fees: {fees}</p>
      <p>Tx Hash: {txHash}</p>
      <p>Result AI:</p>
      <pre className="result-display">{displayedResult}</pre>
      
      <div className="story-quality-checker">
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Enter your story here..."
          rows={10}
          cols={50}
        />
        <button onClick={sendPrompt} disabled={account === "Not connected"}>Send story to ORA</button>
        <button onClick={fetchResult} disabled={account === "Not connected"}>Fetch result from ORA</button>
      </div>
      <div className="typed-result">
        <pre>{typedResult}</pre>
      </div>
      {showPopup && (
        <div className="popup">
          <p>Story sent</p>
        </div>
      )}
    </>
  );
}

export default App;
