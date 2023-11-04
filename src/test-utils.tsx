/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// test-utils.jsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react';

interface Props extends React.PropsWithChildren {
  // children: ReactElement;
}

import { BrowserRouter } from 'react-router-dom';

function render(
  ui: JSX.Element,
  { preloadedState, route = '/', ...renderOptions }: any = {},
) {
  window.history.pushState({}, 'Test Page', route);

  const Wrapper: React.FC<Props> = ({ children }) => {
    return <BrowserRouter>{children}</BrowserRouter>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// export * from '@testing-library/react';

// export { render };

// import { render, RenderOptions } from '@testing-library/react';
// import React from 'react';

// import { BrowserRouter } from 'react-router-dom';

// const Wrapper: React.FC = ({ children }) => (
//   <BrowserRouter>{children}</BrowserRouter>
// );

// const customRender = (
//   ui: React.ReactElement,
//   options?: Omit<RenderOptions, 'wrapper'>,
// ) => render(ui, { wrapper: Wrapper, ...options });

// export * from '@testing-library/react';
// export { customRender as render };
