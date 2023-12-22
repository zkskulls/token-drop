import { useEffect } from "react";
import { ConnectWallet, useAddress, useTokenBalance, useTokenDrop, useTokenSupply, useClaimToken, lightTheme } from "@thirdweb-dev/react";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const address = useAddress();
  const tokenDrop = useTokenDrop("0x37dAd75d9076F7F6Ebc719d9979D80f3BB0D9Ae9");
  const { data: tokenSupply } = useTokenSupply(tokenDrop);
  const { data: tokenBalance } = useTokenBalance(tokenDrop, address);
  const { mutate: claimTokens, isLoading } = useClaimToken(tokenDrop);

  // Fetch data from the JSON URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://zkskulls.github.io/reply-claim-app.github.io/wallet.json");
        const jsonData = await response.json();
  
        // Find the matching wallet address in the JSON data
        const userWalletData = jsonData.find((data) => data.wallet === address);
  
        if (userWalletData) {
          // If the wallet matches, set the amount from JSON data
          setAmount(userWalletData.amount.toString());
        }
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };
  
    fetchData();
  }, [address]);

  const onSuccess = () => {
    // Hapus pesan kesalahan sebelum mengatur pesan keberhasilan
    setErrorMessage(""); 
    setSuccessMessage("Tokens claimed!");
  };
  
  const onError = (error) => {
    // Hapus pesan keberhasilan sebelum mengatur pesan kesalahan
    setSuccessMessage("");
    setErrorMessage(`Error claiming tokens!`);
  };

  const handleClaimTokens = async () => {
    try {
      await claimTokens({ amount, to: address }, { onSuccess, onError });
      // Handle success (optional)
    } catch (error) {
      // Handle error (optional)
    }
  };

  return (
    <main className={styles.main}>
<div id="main">

<div className="cardWrapper">

  <div className="cardHeader">
    <span>ZAS TOKEN</span>
  </div>

  <div className="cardContent">
    <img src="assets/coin.svg" alt="coin" />

    <ConnectWallet
        theme={lightTheme({
          colors: {
            primaryButtonBg: "#00A8FF",
            secondaryButtonText: "#00A8FF",
            secondaryIconColor: "#706f78",
          },
        })}
        btnTitle={"Connect Wallet"}
        modalTitle={"Connect "}
        modalSize={"wide"}
        welcomeScreen={{
          title: "Welcome to zkSkulls",
          subtitle:
            "Connect your wallet address to claim ZAS Native Token",
          img: {
            src: "https://zkskulls.com/wp-content/uploads/2023/12/CA744BFA-1.png",
            width: 150,
            height: 150,
          },
        }}
        modalTitleIconUrl={
          "https://zkskulls.com/wp-content/uploads/2023/12/CA744BFA-1.png"
        }
      />

    <span>You Will Receive</span>

    <div className="inputGroup">
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} disabled/>
      <span className="inputName">ZAS</span>
    </div>

    <span className="wallet">{address}</span>

    <span>Token Supply : {tokenSupply?.displayValue} {tokenSupply?.symbol}</span>
    <span>Your token balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</span>

    {successMessage && <span className="success-message boldPixel msg">{successMessage}</span>}
    {errorMessage && <span className="error-message boldPixel msg">{errorMessage}</span>}

    <div className="navigateGroup">

      {/* Column pertama */}
      <div className="column">
        <a href="https://zkskulls.com" className="boldPixelNon">BACK TO ZKSKULLS</a>
      </div>

      {/* Column kedua */}
      <div className="column">
        <a className="boldPixel claim" onClick={handleClaimTokens} disabled={isLoading}>CLAIM</a>
      </div>

    </div>
  </div>

</div>

</div>
    </main>
  );
}
