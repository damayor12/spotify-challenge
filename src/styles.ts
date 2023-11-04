import styled, { createGlobalStyle } from 'styled-components';

export const colors = {
  primary: '#0085f230;',
};

export const GlobalStyle = createGlobalStyle`


  *, body,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box !important;
}

  body {
    max-height: 100vh;
  }

  a {
  text-decoration: none;
}


`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  box-shadow: 0 5px 10px grey;
  background-color: white;
  text-align: left;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 16px;

  thead {
    box-shadow: 0 5px 10px grey;
  }

  th {
    padding: 1rem 2rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-size: 0.7rem;
    font-weight: 900;
  }

  td {
    padding: 1rem;
  }

  tr:nth-child(even) {
    background-color: #f4f6fb;
  }

  th,
  td {
    border: 1px solid black;
  }

  td {
    width: 100px;
    max-width: max-content;
  }
`;
