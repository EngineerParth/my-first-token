//import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { ethers } from "ethers";
import MFToken from "./artifacts/contracts/MFToken.sol/MFToken.json";
const tokenAddress = process.env.REACT_APP_MF_TOKEN_ADDR_INFURA;

function App() {
	const [receiverAccount, setReceiverAccount] = useState();
	const [amount, setAmount] = useState();
	const [accountBalance, setAccountBalance] = useState();
	const [userAccount, setUserAccount] = useState();
	//requestAccount();
	function handleChange(e) {
		if (e.target.name === "account")
			setReceiverAccount(e.target.value);
		else if (e.target.name === "amount") setAmount(e.target.value);
	}

	async function requestAccount() {
		const [account] = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		setUserAccount(account);
	}

	async function getBalance() {
		//await requestAccount();
		if (typeof window.ethereum !== "undefined") {
			const [account] = await window.ethereum.request({
				method: "eth_requestAccounts",
			});

			const provider = new ethers.providers.Web3Provider(
				window.ethereum
			);
			const contract = new ethers.Contract(
				tokenAddress,
				MFToken.abi,
				provider
			);
			const balance = await contract.balanceOf(account);
			//console.log("balance: ", balance.toString());
			setAccountBalance(balance.toString());
		}
	}
	async function sendCoins() {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.providers.Web3Provider(
				window.ethereum
			);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				tokenAddress,
				MFToken.abi,
				signer
			);
			const transaction = await contract.transfer(
				receiverAccount,
				amount
			);
			await transaction.wait();
			console.log(
				`${amount} Coins successfully transferred to ${receiverAccount}`
			);
			getBalance();
		}
	}
	return (
		<div className="App">
			<span class="UserAccount" name="userAccount">
				{userAccount || ""}
			</span>
			{userAccount === undefined ? (
				<div>
					<button onClick={requestAccount}>
						Connect wallet
					</button>
				</div>
			) : (
				<div className="App-header">
					<button onClick={getBalance}>
						get balance
					</button>
					<span name="accountBalance">
						{accountBalance !== undefined
							? accountBalance +
							  " MFT"
							: ""}
					</span>
					<input
						onChange={handleChange}
						name="account"
						value={receiverAccount || ""}
						placeholder="Receiver Account"
					/>
					<input
						onChange={handleChange}
						name="amount"
						value={amount || ""}
						placeholder="Amount"
					/>
					<button onClick={sendCoins}>
						Transfer
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
