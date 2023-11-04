/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { baseUrl } from '../mocks/handlers';

function Home() {
  const [data, setData] = useState<{ firstName: string } | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${baseUrl}`);

        console.log('response', response);

        // if (!response) throw new Error(response);

        const data = await response.json();

        console.log('response', data);

        setLoading(false);

        setIsSuccess(true);
        setData(data);

        setError('');
      } catch (error) {
        setLoading(false);
        setError('An error occurred. Awkward..');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        {data?.firstName && <span>{data.firstName}</span>}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
