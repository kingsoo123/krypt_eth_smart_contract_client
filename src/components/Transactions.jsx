import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";

const TransactionCard = ({
  addressFrom,
  keyword,
  addressTo,
  message,
  timeStamp,
  amount,
}) => {
  const gifurl = useFetch({ keyword });

  return (
    <div className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] flex-col rounded-md p-3 hover:shadow-2xl">
      <div className="flex flex-col items-centerw-full mt-3">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">
              From :{shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://ropsten.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base">
              To :{shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {amount}ETH</p>
          {true && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={
            gifurl ||
            "https://media.giphy.com/media/G7nUzRr3LvSu48bR8U/giphy.gif"
          }
          alt="gif"
          className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black  p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timeStamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount, allTransaction } = useContext(TransactionContext);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 bg-black">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transaction
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your wallet to see latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-3">
          {allTransaction.map((transaction, index) => (
            <TransactionCard key={index} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
