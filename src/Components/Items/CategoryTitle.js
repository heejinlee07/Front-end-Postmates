/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import ViewAll from './ViewAll';

const CategoryTitle = ({ title, info, view }) => {
  const CategoryTitleBlock = styled.div`
    margin: 0 0 42px 0;
    padding: 0 0 20px 0;

    border-bottom: 1px solid #eee;

    /* background-color: #d3d3d3; */
    em {
      margin: 0 0 2px 0;
      color: #8f95a3;
      font-size: 14px;
      font-weight: 200;
    }
  `;

  const CategoryTitleText = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    width: 100%;
    margin: 0 0 10px 0;
    h3 {
      /* margin: 0 0 12px 0; */
      font-size: 24px;
      font-weight: bold;
      letter-spacing: -1.16px;
    }
  `;
  // console.log(title);
  return (
    <>
      <CategoryTitleBlock>
        <CategoryTitleText>
          <h3>{title}</h3>
          {view && <ViewAll view={view} />}
        </CategoryTitleText>
        <em>{info}</em>
      </CategoryTitleBlock>
    </>
  );
};

export default CategoryTitle;
