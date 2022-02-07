import React, { useState } from "react";
import "./HeroSection.css";
import logo from "./logo.png";
import { Button } from "../Button";
import { useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import { address } from "../contract";
import nftabi from "../contract/NFT.json";
import {
  useTotalSupply,
  useMaxSupply,
  useIsOnlyWhitelisted,
  useCost,
  useWeiCost,
  useIsWhitelisted,
} from "../hooks";
import { connectionError, mintError, mintSuccess } from "../helper";

function HeroSection({
  lightBg,
  lightText,
  lightTextDesc,
  description,
  imgStart,
}) {
  const { account, activateBrowserWallet } = useEthers();
  const [amount, setAmount] = useState(1);
  const [minting, setMinting] = useState(false);
  const totalSupply = useTotalSupply();
  const maxSupply = useMaxSupply();
  const isOnlyWhitelisted = useIsOnlyWhitelisted();
  const isWhitelistedUser = useIsWhitelisted(account);
  const weiCost = useWeiCost();
  const cost = useCost();
  const nftInterface = new ethers.utils.Interface(nftabi);

  const onError = () => {
    connectionError();
  };

  const increaseAmount = () => {
    if (amount < 25) {
      setAmount(amount + 1);
    }
  };
  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  async function handleMint() {
    try {
      setMinting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const txCost = Number(weiCost) * amount;
      /* next, create the item */
      let nftcontract = new ethers.Contract(address, nftInterface, signer);
      let transaction = await nftcontract.mint(amount, {
        value: txCost.toString(),
      });
      await transaction.wait();
      setAmount(1);
      setMinting(false);
      mintSuccess();
    } catch (error) {
      mintError();
      console.log(error);
      setAmount(1);
      setMinting(false);
    }
  }

  return (
    <>
      {totalSupply < 5555 ? (
        <div
          className={
            lightBg ? "home__hero-section" : "home__hero-section darkBg"
          }
        >
          <div className="container">
            <div
              className="row home__hero-row"
              style={{
                display: "flex",
                flexDirection: imgStart === "start" ? "row-reverse" : "row",
              }}
            >
              <div className="col">
                <div className="home__hero-text-wrapper">
                  <div className="top-line">Mint Your PXF</div>
                  <h1 className={lightText ? "heading" : "heading dark"}>
                    {totalSupply}/{maxSupply}
                    <br />
                    Price {cost * amount}
                    {ethers.constants.EtherSymbol}
                  </h1>
                  <p
                    className={
                      lightTextDesc
                        ? "home__hero-subtitle"
                        : "home__hero-subtitle dark"
                    }
                  >
                    Minting : Live
                    <br />
                    First 555 are FREE + Gas to mint. The remaining 5000 are
                    0.01ETH.
                  </p>
                  {isOnlyWhitelisted ? (
                    <div>
                      {isWhitelistedUser ? (
                        <div style={{ display: "flex" }}>
                          {account ? (
                            <>
                              <div>
                                <Button
                                  onClick={() => decreaseAmount()}
                                  className="margin-btn"
                                  buttonSize="btn--medium"
                                  buttonColor="blue"
                                >
                                  -
                                </Button>
                              </div>
                              <div>
                                {minting ? (
                                  <Button
                                    buttonSize="btn--wide"
                                    buttonColor="blue"
                                  >
                                    Please Wait
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => handleMint()}
                                    buttonSize="btn--wide"
                                    buttonColor="blue"
                                  >
                                    Mint {amount} PXF
                                  </Button>
                                )}
                              </div>
                              <div>
                                <Button
                                  onClick={() => increaseAmount()}
                                  className="margin-btn"
                                  buttonSize="btn--medium"
                                  buttonColor="blue"
                                >
                                  +
                                </Button>
                              </div>
                            </>
                          ) : (
                            <Button
                              onClick={() => activateBrowserWallet(onError)}
                              buttonSize="btn--wide"
                              buttonColor="blue"
                            >
                              Connect
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div>
                          {account ? (
                            <>
                              <Button buttonSize="btn--wide" buttonColor="blue">
                                You are not whitelisted
                              </Button>
                            </>
                          ) : (
                            <Button
                              onClick={() => activateBrowserWallet(onError)}
                              buttonSize="btn--wide"
                              buttonColor="blue"
                            >
                              Connect
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: "flex" }}>
                        {account ? (
                          <>
                            <div>
                              <Button
                                onClick={() => decreaseAmount()}
                                className="margin-btn"
                                buttonSize="btn--medium"
                                buttonColor="blue"
                              >
                                -
                              </Button>
                            </div>
                            <div>
                              {minting ? (
                                <Button
                                  buttonSize="btn--wide"
                                  buttonColor="blue"
                                >
                                  Please Wait
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => handleMint()}
                                  buttonSize="btn--wide"
                                  buttonColor="blue"
                                >
                                  Mint {amount} PXF
                                </Button>
                              )}
                            </div>
                            <div>
                              <Button
                                onClick={() => increaseAmount()}
                                className="margin-btn"
                                buttonSize="btn--medium"
                                buttonColor="blue"
                              >
                                +
                              </Button>
                            </div>
                          </>
                        ) : (
                          <Button
                            onClick={() => activateBrowserWallet(onError)}
                            buttonSize="btn--wide"
                            buttonColor="blue"
                          >
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="home__hero-img-wrapper">
                  <img alt="logo" src={logo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            lightBg ? "home__hero-section" : "home__hero-section darkBg"
          }
        >
          <div className="container">
            <div
              className="row home__hero-row"
              style={{
                display: "flex",
                flexDirection: imgStart === "start" ? "row-reverse" : "row",
              }}
            >
              <div className="col">
                <div className="home__hero-text-wrapper">
                  <div className="top-line">Buy your PXF from Opensea</div>
                  <h1 className={lightText ? "heading" : "heading dark"}>
                    Sold Out
                  </h1>
                  <p
                    className={
                      lightTextDesc
                        ? "home__hero-subtitle"
                        : "home__hero-subtitle dark"
                    }
                  >
                    We have solded out, You can buy on Opensea
                  </p>
                  <div to="/sign-up">
                    <a href="https://www.opensea.io" target="blank">
                      <Button buttonSize="btn--wide" buttonColor="blue">
                        Buy On Opensea
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="home__hero-img-wrapper">
                  <img alt="logo" src={logo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HeroSection;
