// src/components/Login.jsx
import React from 'react';
import LoginButton from './LoginButton';

const Login = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 px-4">
    <div className="bg-white rounded-lg shadow-lg p-10 max-w-sm w-full text-center">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Please log in to continue
      </h2>
      <LoginButton />
    </div>
  </div>
);

export default Login;