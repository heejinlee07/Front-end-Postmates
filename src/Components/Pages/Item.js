/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import StoreIndividual from '../Layout/StoreIndividual';
import MenuList from '../Layout/MenuList';

const StorePageBlock = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemPage = ({ storeData }) => {
  return (
    <StorePageBlock>
      <StoreIndividual storeData={storeData} />
      <MenuList storeData={storeData} />
    </StorePageBlock>
  );
};

export default ItemPage;
