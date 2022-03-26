import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    text-decoration: none;
    }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  justify-content: center;
  align-items: center;

  button {
    height: 30px;
    background: #222;
    color: #fff;
    font-size: 12px;
    border-radius: 6px; 
    padding: 2px 2px;
    margin-top: 5px;
    cursor: pointer;
  }
  input {
    padding: 12px 16px;
    background: #f5f5f5;
    border: 1px solid #3D495C;
    border-radius: 6px;
    margin: 5px;
  }
  textarea {
    padding: 12px 16px;
    background: #f5f5f5;
    border: 1px solid #3D495C;
    border-radius: 6px;
    margin: 5px;
  }
`;

export const Details = styled.div`
  display: flex;
  
  img {
    width: 290px;
    height: 200px;
    margin-right: 20px;
  }
  
  div {
    margin: 30px;
  }
`;
