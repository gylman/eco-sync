import React, { useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import ProfilePage from './ProfilePage';
import EcoPage from './EcoPage';

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

const Project = () => {
  const [is0Active, setIs0Active] = useState(true);
  const handleTab = (event) => {
    event.preventDefault();
    event.target.textContent === 'Profile'
      ? setIs0Active(true)
      : setIs0Active(false);
  };

  return (
    <Container>
      <Tabs>
        <Tab active={is0Active ? true : undefined} onClick={handleTab}>
          <Text>Profile</Text>
        </Tab>
        <Tab active={!is0Active ? true : undefined} onClick={handleTab}>
          <Text>Ecosystem</Text>
        </Tab>
      </Tabs>
      {is0Active ? <ProfilePage /> : <EcoPage />}
    </Container>
  );
};

export default Project;
