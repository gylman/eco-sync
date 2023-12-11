import React, { useState } from 'react';
import styled from 'styled-components';
import add from '../assets/images/add.svg';
import del from '../assets/images/delete.svg';
import luna from '../assets/images/luna.png';
import dot from '../assets/images/dot.png';
import tcash from '../assets/images/tcash.png';
import zcash from '../assets/images/zcash.png';
import monero from '../assets/images/monero.png';
import ethereum from '../assets/images/ethereum.png';
import tia from '../assets/images/tia.svg';
import cuid from 'cuid';
import { useAccount } from '../contexts/AccountContext';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { useLocation, useParams } from 'react-router';

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const Label = styled.span`
  color: #909090;
  font-family: Dosis;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
export const Input = styled.input`
  display: flex;
  max-width: 579px;
  width: 100%;
  padding: 9px 14px;
  align-items: center;
  border-radius: 10px;
  border: 2px solid #fff;
  background: rgba(255, 255, 255, 0);
  box-shadow: 8px 8px 8px 0px rgba(255, 199, 67, 0.7);
  color: ${({ disabled }) => (disabled ? '#909090' : '#fff')};
  font-family: Dosis;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const EcoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 55px;
  width: 100%;
  padding: 0 40px;
`;

const FieldAndButton = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-end;
  width: 100%;
  justify-content: center;
  margin-top: 40px;
`;

const Add = styled.img`
  cursor: pointer;
  &:hover {
    transform: scale(1.09);
  }
`;

const Cols = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  justify-content: center;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ColHead = styled.p`
  color: #fff;
  text-align: center;
  font-family: Dosis;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ColBody = styled.ul`
  display: flex;
  background: rgba(0, 173, 209, 0.2);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  gap: 20px;
  flex-direction: column;
  padding: 20px;
  overflow-y: scroll;
  border-radius: 8px;
  height: 40%;
`;
const Project = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ProjectLogo = styled.img`
  border-radius: 50%;
`;
const ProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ProjectName = styled.p`
  color: #fff;
  font-family: Dosis;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const ProjectAddress = styled.p`
  color: #fff;
  font-family: Dosis;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Del = styled.img`
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const includes = [
  {
    logo: ethereum,
    address:
      '0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6',
    name: 'Ethereum',
  },
  {
    logo: monero,
    address:
      '0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6',
    name: 'Monero',
  },
  {
    logo: dot,
    address:
      '0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6',
    name: 'Pokadot',
  },
  {
    logo: zcash,
    address:
      '0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6',
    name: 'ZCash',
  },
  {
    logo: luna,
    address:
      '0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6',
    name: 'Luna',
  },
  {
    logo: tcash,
    address:
      '0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6',
    name: 'Tornado Cash',
  },
  {
    logo: tia,
    address:
      '0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6',
    name: 'Celestia',
  },
  {
    logo: ethereum,
    address:
      '0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6',
    name: 'Ethereum',
  },
  {
    logo: monero,
    address:
      '0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6',
    name: 'Monero',
  },
  {
    logo: dot,
    address:
      '0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6',
    name: 'Pokadot',
  },
  {
    logo: zcash,
    address:
      '0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6',
    name: 'ZCash',
  },
  {
    logo: luna,
    address:
      '0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6',
    name: 'Luna',
  },
  {
    logo: tcash,
    address:
      '0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6',
    name: 'Tornado Cash',
  },
  {
    logo: tia,
    address:
      '0xa9a4bda4d31b2189c8403467894d924355289ccd3ad8e2cd1fe4ba53b37408c6',
    name: 'Celestia',
  },
];

const EcoPage = () => {
  const { contractAddress, contractABI } = useAccount();
  const [addedToEco, setAddedToEco] = useState('');

  const handleAddToEcoInput = (e) => {
    setAddedToEco(e.target.value);
  };

  const delFromEco = async (address) => {
    const provider = new Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.updateEcosystem(address, false);
  };

  const addToEco = async () => {
    const provider = new Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.updateEcosystem(addedToEco, true);
  };

  return (
    <EcoContent>
      <FieldAndButton>
        <Field>
          <Label>Add the project address to ecosystem</Label>
          <Input onChange={handleAddToEcoInput} />
        </Field>
        <Add src={add} onClick={addToEco} />
      </FieldAndButton>
      <Cols>
        <Col>
          <ColHead>Includes:</ColHead>
          <ColBody>
            {includes.map((project) => (
              <Project key={cuid()}>
                <ProjectLogo width='65px' src={project.logo} />
                <ProjectDetails>
                  <ProjectName>{project.name}</ProjectName>
                  <ProjectAddress>{project.address}</ProjectAddress>
                </ProjectDetails>
                <Del
                  src={del}
                  width='46px'
                  onClick={() => delFromEco(project.address)}
                />
              </Project>
            ))}
          </ColBody>
        </Col>
        <Col>
          <ColHead>Is included in:</ColHead>
          <ColBody>
            {includes.map((project) => (
              <Project key={cuid()}>
                <ProjectLogo width='65px' src={project.logo} />
                <ProjectDetails>
                  <ProjectName>{project.name}</ProjectName>
                  <ProjectAddress>{project.address}</ProjectAddress>
                </ProjectDetails>
              </Project>
            ))}
          </ColBody>{' '}
        </Col>
      </Cols>
    </EcoContent>
  );
};

export default EcoPage;
