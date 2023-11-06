/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { render as rtlRender } from '@testing-library/react';

interface Props extends React.PropsWithChildren {}

import { BrowserRouter } from 'react-router-dom';

jest.spyOn(window, 'close').mockImplementation(jest.fn());

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

export * from '@testing-library/react';

export { render };
