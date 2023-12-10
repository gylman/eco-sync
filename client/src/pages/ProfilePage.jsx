import React, { useState } from 'react';
import styled from 'styled-components';
import radius from '../assets/images/radius.png';
import { Button } from './RootLayout';
import { useAccount } from '../contexts/AccountContext';
import CircleImageUploader from '../components/CircleImageUploader';

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
const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Label = styled.span`
  color: #909090;
  font-family: Dosis;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const Input = styled.input`
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
    </Container>
  );
};

export default ProfilePage;
