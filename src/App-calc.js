
import React, {useState} from 'react';
import {ethers} from 'ethers'
import Calc from "./artifacts/contracts/Calc.sol/Calc.json";
const calcAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export default function App() {
	const [temp, setTemp] = useState(0);
	const [res, setRes] = useState(0);
	function handleChange(e) {
		setTemp(parseInt(e.target.value));
	}

	async function requestAccounts() {
		await window.ethereum.request({
			method: "eth_requestAccounts",
		});
	}

	async function getResult() {
		if (typeof window.ethereum !== "undefined") {
			await requestAccounts();
			const provider = new ethers.providers.Web3Provider(
				window.ethereum
			);
			const contract = new ethers.Contract(
				calcAddress,
				Calc.abi,
				provider
			);
			try {
				setRes((await contract.res()).toNumber());
			} catch (err) {
				console.log(err);
				setRes(err.message);
			}
		}
	}
	async function setResult() {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.providers.Web3Provider(
				window.ethereum
			);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				calcAddress,
				Calc.abi,
				signer
			);
			const transaction = await contract.add(temp);
			await transaction.wait();
			getResult();
		}
	}
	return (
		<div className="App">
			<input
				name="temp"
				placeholder="Enter a number"
				onChange={handleChange}
				value={temp}
			/>
			<p>{res}</p>
		</div>
	);
}
