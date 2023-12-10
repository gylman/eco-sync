import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import radius from '../assets/images/radius.png';
import { Button } from './RootLayout';
import { useAccount } from '../contexts/AccountContext';
import CircleImageUploader from '../components/CircleImageUploader';
import add from '../assets/images/add.svg';
import del from '../assets/images/delete.svg';
import luna from '../assets/images/luna.png';
import dot from '../assets/images/dot.png';
import tcash from '../assets/images/tcash.png';
import zcash from '../assets/images/zcash.png';
import monero from '../assets/images/monero.png';
import ethereum from '../assets/images/ethereum.png';
import tia from '../assets/images/tia.svg';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
const Container = styled.div`
  width: 100%;
  height: calc(100% - 102px);
  overflow-y: hidden;
`;

const Tabs = styled.div`
  width: 100%;
  display: flex;
  height: 70px;
  position: sticky;
  top: 0;
`;

const Tab = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  padding: 10px 0px 10px 0px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0px 0px 200px 200px;
  cursor: pointer;
  background: ${({ active }) =>
    active
      ? 'linear-gradient(90deg, #bb98e9 1.8%, #5100bb 94.91%)'
      : 'linear-gradient(180deg, rgba(187, 152, 233, 0.50) 0%, rgba(81, 0, 187, 0.00) 100%)'};
`;

const Text = styled.p`
  color: #fff;
  font-family: Dosis;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 29px;
`;

const Content = styled.div`
  padding-top: 64px;
  padding-bottom: 32px;
  display: flex;
  gap: 70px;
  width: 100%;
  justify-content: center;
`;
const Logo = styled.div`
  gap: 10px;
  flex-direction: column;
  display: flex;
`;

const AddLogo = styled.input`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background: blue;
  display: flex;
  align-items: center;
`;

const FieldsAndButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  max-width: 500px;
  width: 100%;
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
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
  min-width: 520px;
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

const ProfilePage = () => {
  const { account, contractAddress, contractABI } = useAccount();
  const [profileIsActive, setProfileIsActive] = useState(true);
  const handleTab = (event) => {
    event.preventDefault();
    console.log(event.target.textContent);
    event.target.textContent === 'Profile'
      ? setProfileIsActive(true)
      : setProfileIsActive(false);
  };

  const [logo, setLogo] = useState('/pre-ipfs');
  const [name, setName] = useState('');
  const [hasToken, setHasToken] = useState(false);
  const [token, setToken] = useState('');
  const [description, setDescription] = useState('');
  const [addedToEco, setAddedToEco] = useState('');

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleLogo = (e) => {
    setLogo(e.target.value);
  };
  const handleToken = (e) => {
    setToken(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    console.log(logo, name, hasToken, token, description);
  };

  const handleAddToEcoInput = (e) => {
    setAddedToEco(e.target.value);
  };

  const addToEco = async () => {
    const provider = new Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    // Calling a function that does not change blockchain state and returns a value

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Define gas price and gas limit
    const gasPrice = ethers.parseUnits('5000', 'gwei'); // 10 gwei, for example
    const gasLimit = 100000; // example value, adjust based on your needs
    // or whatever value you want to send

    const tx = await contract.updateEcosystem(addedToEco, true, {
      gasPrice: gasPrice,
      gasLimit: gasLimit,
    });
  };

  useEffect(() => {
    token && !hasToken && setHasToken(true);
  }, [hasToken, token]);

  const handleSave = async () => {
    const provider = new Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    // Calling a function that does not change blockchain state and returns a value

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Define gas price and gas limit
    const gasPrice = ethers.parseUnits('100', 'gwei'); // 10 gwei, for example
    const gasLimit = 100000; // example value, adjust based on your needs
    // or whatever value you want to send

    const tx = await contract.addCompany(name, logo, hasToken, token, {
      gasPrice: gasPrice,
      gasLimit: gasLimit,
    });
  };

  return (
    <Container>
      <Tabs>
        <Tab active={profileIsActive} onClick={handleTab}>
          <Text>Profile</Text>
        </Tab>
        <Tab active={!profileIsActive} onClick={handleTab}>
          <Text>Ecosystem</Text>
        </Tab>
      </Tabs>
      {profileIsActive ? (
        <Content>
          <Logo>
            <Label>Logo</Label>
            <CircleImageUploader />
          </Logo>
          <FieldsAndButton>
            <Fields>
              <Field>
                <Label>Address</Label>
                <Input value={account} disabled />
              </Field>
              <Field>
                <Label>Name</Label>
                <Input onChange={handleName} />
              </Field>
              <Field>
                <Label>Token</Label>
                <Input onChange={handleToken} />
              </Field>
              <Field>
                <Label>Description</Label>
                <Input onChange={handleDescription} />
              </Field>
            </Fields>
            <Button onClick={handleSave}>Save</Button>
          </FieldsAndButton>
        </Content>
      ) : (
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
                  <Project key={project.address}>
                    <ProjectLogo width='65px' src={project.logo} />
                    <ProjectDetails>
                      <ProjectName>{project.name}</ProjectName>
                      <ProjectAddress>{project.address}</ProjectAddress>
                    </ProjectDetails>
                    <Del src={del} width='46px' />
                  </Project>
                ))}
              </ColBody>
            </Col>
            <Col>
              <ColHead>Is included in:</ColHead>
              <ColBody>
                {includes.map((project) => (
                  <Project key={project.address}>
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
      )}
    </Container>
  );
};

export default ProfilePage;
