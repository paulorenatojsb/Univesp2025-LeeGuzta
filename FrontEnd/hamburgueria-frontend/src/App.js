// src/App.js
import React from 'react';
import logo from './logo.svg';

function App() {
  return (
    <div
      className="
        min-h-screen 
        flex flex-col justify-center items-center 
        bg-gray-50 
        p-4 sm:p-6 md:p-8
      "
    >
      <header className="text-center">
        <img
          src={logo}
          alt="logo"
          className="
            w-20 h-20 
            sm:w-28 sm:h-28 
            md:w-36 md:h-36 
            animate-spin
          "
        />
        <p
          className="
            mt-4 
            text-base 
            sm:text-lg 
            md:text-xl 
            text-gray-800
          "
        >
          Edit{' '}
          <code className="bg-gray-200 px-1 rounded">
            src/App.js
          </code>{' '}
          and save to reload.
        </p>
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-6 
            inline-block 
            text-blue-600 
            hover:text-blue-800 
            text-sm 
            sm:text-base 
            md:text-lg
          "
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
