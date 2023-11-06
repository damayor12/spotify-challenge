import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { GlobalStyle } from './styles';
import React, { lazy } from 'react';
import Header from './components/Header/Header';
import { LoggedInProvider } from './hooks/useAuth';
import { TracksProvider } from './hooks/useTracks';
import ScrollToTop from './utils/ScrollToTop';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme/theme';

const Home = lazy(() => import('./pages/Home'));
const Details = lazy(() => import('./pages/Details'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ScrollToTop />

      <LoggedInProvider>
        <TracksProvider>
          <React.Suspense fallback={<>Loading..</>}>
            <Header />
            <div className="app">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>

                <Route path="/search" component={Home}>
                  <Home />
                </Route>

                <Route exact path="/tracks/:id">
                  <Details />
                </Route>
              </Switch>
            </div>
          </React.Suspense>
        </TracksProvider>
      </LoggedInProvider>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </ThemeProvider>
  );
}

export default App;
