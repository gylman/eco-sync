import React from "react";
import styled from "styled-components";
import luna from "../assets/images/luna.png";
import dot from "../assets/images/dot.png";
import tcash from "../assets/images/tcash.png";
import zcash from "../assets/images/zcash.png";
import monero from "../assets/images/monero.png";
import ethereum from "../assets/images/ethereum.png";
import tia from "../assets/images/tia.svg";
import cuid from "cuid";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  overflow: scroll;
`;

const Row = styled.div`
  display: flex;
`;

const ColHead = styled.p`
  color: #fff;
  font-family: Dosis;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  border: 4px solid #fff;
  padding: 20px;
  width: 400px;
  display: flex;
  justify-content: center;
  background: black;
`;

const ColCell = styled.p`
  color: #fff;
  font-family: Dosis;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  border: 4px solid #fff;
  padding: 20px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #021538;
`;

const includes = [
  {
    logo: ethereum,
    address:
      "0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6",
    name: "Ethereum",
    numIn: 10,
    numHas: 3,
  },
  {
    logo: monero,
    address:
      "0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6",
    name: "Monero",
    numIn: 10,
    numHas: 3,
  },
  {
    logo: dot,
    address:
      "0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6",
    name: "Pokadot",
    numIn: 10,
    numHas: 3,
  },
  {
    logo: zcash,
    address:
      "0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6",
    name: "ZCash",
    numIn: 10,
    numHas: 3,
  },
  {
    logo: luna,
    address:
      "0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6",
    name: "Luna",
    numIn: 10,
    numHas: 3,
  },
  {
    logo: tcash,
    address:
      "0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6",
    name: "Tornado Cash",
    numIn: 10,
    numHas: 3,
  },
  {
    logo: tia,
    address:
      "0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6",
    name: "Celestia",
    numIn: 10,
    numHas: 3,
  },
  {
    logo: ethereum,
    address:
      "0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6",
    name: "Ethereum",
    numIn: 10,
    numHas: 3,
  },
  {
    logo: monero,
    address:
      "0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6",
    name: "Monero",
    numIn: 10,
    numHas: 3,
  },
  {
    logo: dot,
    address:
      "0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6",
    name: "Pokadot",
    numIn: 10,
    numHas: 3,
  },
  {
    logo: zcash,
    address:
      "0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6",
    name: "ZCash",
    numIn: 10,
    numHas: 3,
  },
  {
    logo: luna,
    address:
      "0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6",
    name: "Luna",
    numIn: 10,
    numHas: 3,
  },
  {
    logo: tcash,
    address:
      "0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6",
    name: "Tornado Cash",
    numIn: 10,
    numHas: 3,
  },
  {
    logo: tia,
    address:
      "0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6",
    name: "Celestia",
    numIn: 10,
    numHas: 3,
  },
];

const COMPANIES_QUERY = gql`
  {
    companies {
      id
      name
      walletAddress
      profilePhoto
      includeCount
      includedByCount
    }
  }
`;

const GlobalPage = () => {
  const { loading, error, data } = useQuery(COMPANIES_QUERY);

  console.log("data", data);

  return (
    <Container>
      <Row>
        <ColHead>Project</ColHead>
        <ColHead>Logo</ColHead>
        <ColHead>Includes</ColHead>
        <ColHead>Included in</ColHead>
      </Row>
      {data?.companies?.map((project) => (
        <Row key={cuid()}>
          <ColCell>{project.name}</ColCell>
          <ColCell>
            <img
              src={
                project.profilePhoto
                  ? `${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${
                      project.profilePhoto
                    }`
                  : undefined
              }
              style={{
                width: "65px",
                height: "65px",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </ColCell>
          <ColCell>{project.includeCount}</ColCell>
          <ColCell>{project.includedByCount}</ColCell>
        </Row>
      ))}
    </Container>
  );
};

export default GlobalPage;
