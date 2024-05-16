import React, { useState } from 'react';
import BankersAlgorithm from './BankersAlgorithm';
import DiskScheduling from './DiskScheduling';

const Page = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-8">Algorithm Simulation</h1>
      <div className="flex space-x-4">
        <button className="bg-white text-black rounded px-4 py-2" onClick={() => handleSelectOption('bankers')}>Banker's Algorithm</button>
        <button className="bg-white text-black rounded px-4 py-2" onClick={() => handleSelectOption('diskScheduling')}>Disk Scheduling</button>
      </div>
      <div className="mt-8">
        {selectedOption === 'bankers' && <BankersAlgorithm />}
        {selectedOption === 'diskScheduling' && <DiskScheduling />}
      </div>
    </div>
  );
};

export default Page;