import React from 'react';
import styled from 'styled-components';
import add from '../assets/images/add.svg';

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

const EcoPage = () => {
  // Function with args array of companies returns the intersection of the companies included in their ecosystem
  // Function with args array of companies returns the union of the companies included in their ecosystem
  // Function that sorts by the number of inclusion in other ecosystems
  // Function that sorts by the number of companies in ecosystem

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
                <Del src={del} width='46px' />
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
