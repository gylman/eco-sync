import React, { useState } from 'react';
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
const Container = styled.div`
  width: 100%;
  align-items: center;
  height: 100%;
  flex-direction: column;
  display: flex;
  gap: 100px;
`;

const Tabs = styled.div`
  width: 100%;
  display: flex;
  height: 100px;
`;

const Tab = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  padding: 20px 0px 21px 0px;
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
  height: 430px;
  overflow-y: scroll;
  border-radius: 8px;
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
const ProfilePage = () => {
  const { account } = useAccount();
  const [profileIsActive, setProfileIsActive] = useState(true);
  const handleTab = (event) => {
    event.preventDefault();
    console.log(event.target.textContent);
    event.target.textContent === 'Profile'
      ? setProfileIsActive(true)
      : setProfileIsActive(false);
  };

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
  ];

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
                <Input />
              </Field>
              <Field>
                <Label>Token</Label>
                <Input />
              </Field>
              <Field>
                <Label>Description</Label>
                <Input />
              </Field>
            </Fields>
            <Button>Save</Button>
          </FieldsAndButton>
        </Content>
      ) : (
        <EcoContent>
          <FieldAndButton>
            <Field>
              <Label>Add the project address to ecosystem</Label>
              <Input />
            </Field>
            <Add src={add} />
          </FieldAndButton>
          <Cols>
            <Col>
              <ColHead>Includes:</ColHead>
              <ColBody>
                {includes.map((project) => (
                  <Project>
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
                  <Project>
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
