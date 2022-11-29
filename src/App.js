import React, { useState } from "react";
import Login from "./components/Login";
import { indexerClient, myAlgoConnect } from "./utils/constants";
import { Notification } from "./components/utils/Notifications";
import Home from "./components/Home";
import { Container, Nav } from "react-bootstrap";
import Wallet from "./components/Wallet";

const App = function AppWrapper() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(0);

  const fetchBalance = async (accountAddress) => {
    indexerClient
      .lookupAccountByID(accountAddress)
      .do()
      .then((response) => {
        const _balance = response.account.amount;
        setBalance(_balance);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const connectWallet = async () => {
    myAlgoConnect
      .connect()
      .then((accounts) => {
        const _account = accounts[0];
        setAddress(_account.address);
        fetchBalance(_account.address);
      })
      .catch((error) => {
        console.log("Could not connect to MyAlgo wallet");
        console.error(error);
      });
  };

  const disconnect = () => {
    setAddress(null);
    setBalance(null);
  };
  console.log(balance);

  return (
    <>
      {address ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                amount={balance}
                address={address}
                disconnect={disconnect}
              />
            </Nav.Item>
          </Nav>
          <Notification />
          <Home address={address} fetchBalance={fetchBalance} />
        </Container>
      ) : (
        <Login connect={connectWallet} />
      )}
    </>
  );
};

export default App;
