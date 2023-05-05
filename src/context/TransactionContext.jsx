import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [allTransaction, setAllTransaction] = useState([]);
  const [formData, setFormData] = useState({
    address: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");
      const transactionContract = getEthereumContract();
      const avalaibleTransactions =
        await transactionContract.getAllTransactions();
      const structureTransactions = avalaibleTransactions.map(
        (transaction) => ({
          addressTo: transaction?.receiver,
          addressFrom: transaction?.from,
          timeStamp: new Date(
            transaction?.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction?.message,
          keyword: transaction?.keyword,
          amount: parseInt(transaction?.amount._hex) * 10 ** 18,
        })
      );
      setAllTransaction(structureTransactions);
      console.log(structureTransactions, "ALL");
    } catch (error) {
      console.log(error);
    }
  };
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const account = await ethereum.request({ method: "eth_accounts" });

      console.log(account, "::::::::ACCOUNT");
      if (account.length) {
        setCurrentAccount(account[0]);
        getAllTransactions();
      } else {
        console.log("No connected account");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const checkIfTransactionExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");
      const { addressTo, amount, keyword, message } = formData;

      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockChain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());

      console.log("heheheheh");
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum objectssssssssssss");
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionExist();
  }, [currentAccount]);
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        handleChange,
        formData,
        sendTransaction,
        loading,
        allTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
