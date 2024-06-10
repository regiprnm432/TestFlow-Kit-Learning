import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-screen bg-blue-900 text-white flex flex-col">
      <header className="flex items-center w-full p-5">
        {/* Logo */}
        <img
          src="/src/assets/logo/polban.png"
          alt="Polban Logo"
          className="w-20 h-20 mr-4"
        />
        <div className="text-2xl font-bold">Coverage Test</div>
      </header>
      <main className="flex flex-grow w-full px-10">
        <div className="flex flex-[2] flex-col items-start justify-start mt-8">
          <h1 className="text-4xl font-bold mb-4">PEMBELAJARAN PENGUJIAN PERANGKAT LUNAK</h1>
          <p className="mb-6">Masuk dan lihat, anda bisa belajar banyak hal tentang pembuatan test case dengan path testing</p>
          <button
            onClick={handleLoginClick}
            className="bg-white text-bold text-blue-900 px-4 py-2 rounded-20"
          >
            LOGIN
          </button>
        </div>
        <div className="flex flex-[3] justify-center items-start">
          <img
            src="src/assets/logo/landing.png"
            alt="Illustration"
            style={{ width: '450px', height: 'auto' }}
          />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
