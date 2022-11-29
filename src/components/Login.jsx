import React from "react";
import { Button, Container } from "react-bootstrap";

const Login = ({ connect }) => {
  return (
    <Container style={{ maxWidth: "50%", margin: "10% auto" }}>
      <h1>Pet Adoption Store</h1>
      <p>
        Yo, come on in and adopt a pet on the blockchain, or create yours right
        away
      </p>
      <Button onClick={connect}>Connect Wallet</Button>
    </Container>
  );
};

export default Login;
