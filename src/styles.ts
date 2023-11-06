import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

* {
  scroll-behavior: smooth;
}

*,

*::after,
*::before {
        box-sizing: 'border-box',
      }

.app {
  min-height: 100vh;
  background-color: #39445a;
  color: white;
  padding-top: 24px;
  padding-bottom: 70px;
  
}

@media (max-width: 700px) {
  .app {
    padding-top: 70px;
  }
}
`;
