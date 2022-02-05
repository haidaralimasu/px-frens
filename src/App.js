import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ChainId, DAppProvider } from "@usedapp/core";
import Home from "./components/Minter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accordion from "./components/Accordian";
import Roadmap from "./components/Roadmap";

const config = {
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: {
    [ChainId.Rinkeby]:
      "https://rinkeby.infura.io/v3/70ced43c56d248f18566ebe01e2d9fbe",
  },
  supportedChains: [ChainId.Rinkeby],
};

const App = () => {
  return (
    <DAppProvider config={config}>
      <ToastContainer />
      <Navbar />
      <Home />
      <Roadmap />
      <Accordion />
      <Footer />
    </DAppProvider>
  );
};

export default App;
