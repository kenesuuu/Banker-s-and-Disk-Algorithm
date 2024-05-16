import React, { useState } from 'react';

const BankersAlgorithm = () => {
  const [resourceA, setResourceA] = useState('');
  const [resourceB, setResourceB] = useState('');
  const [resourceC, setResourceC] = useState('');
  const [allocationMatrix, setAllocationMatrix] = useState(Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => '')));
  const [maxMatrix, setMaxMatrix] = useState(Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => '')));
  const [needMatrix, setNeedMatrix] = useState(Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => '')));
  const [availableMatrix, setAvailableMatrix] = useState(Array(3).fill(''));
  const [sequence, setSequence] = useState('');
  const [calcMessages, setCalcMessages] = useState(Array(5).fill(''));

  // Function to find the sequence
  const findSequence = () => {
    const work = [...availableMatrix];
    const finish = Array(5).fill(false);
    const safeSequence = [];
    let iterations = 0;

    while (safeSequence.length < 5 && iterations < 5) {
      let found = false;
      for (let i = 0; i < 5; i++) {
        if (!finish[i] && needMatrix[i][0] <= work[0] && needMatrix[i][1] <= work[1] && needMatrix[i][2] <= work[2]) {
          // Process i can be completed
          for (let j = 0; j < 3; j++) {
            work[j] += parseInt(allocationMatrix[i][j]);
          }
          safeSequence.push(i);
          finish[i] = true;
          found = true;
        }
      }
      if (!found) break; // No safe sequence found
      iterations++;
    }

    if (safeSequence.length === 5) {
      setSequence('Safe sequence: ' + safeSequence.join(' -> '));
    } else {
      setSequence('No safe sequence found.');
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'resourceA') setResourceA(value);
    else if (id === 'resourceB') setResourceB(value);
    else if (id === 'resourceC') setResourceC(value);
  };

  const handleAddAllocation = (i, j, value) => {
    const newAllocationMatrix = [...allocationMatrix];
    newAllocationMatrix[i][j] = value;
    setAllocationMatrix(newAllocationMatrix);
  };

  const handleAddMax = (i, j, value) => {
    const newMaxMatrix = [...maxMatrix];
    newMaxMatrix[i][j] = value;
    setMaxMatrix(newMaxMatrix);
  };

  const handleSample = () => {
    const sampleAllocation = [
      [0, 1, 0],
      [2, 0, 0],
      [3, 0, 2],
      [2, 1, 1],
      [0, 0, 2]
    ];

    const sampleMax = [
      [7, 5, 3],
      [3, 2, 2],
      [9, 0, 2],
      [2, 2, 2],
      [4, 3, 3]
    ];

    setAllocationMatrix(sampleAllocation);
    setMaxMatrix(sampleMax);
    setResourceA(10);
    setResourceB(5);
    setResourceC(7);
  };

  const findAvailable = () => {
    const sumColumn = (matrix, colIndex) => matrix.reduce((acc, row) => acc + parseInt(row[colIndex]), 0);

    const totalResourceA = parseInt(resourceA);
    const totalResourceB = parseInt(resourceB);
    const totalResourceC = parseInt(resourceC);

    const usedResourceA = sumColumn(allocationMatrix, 0);
    const usedResourceB = sumColumn(allocationMatrix, 1);
    const usedResourceC = sumColumn(allocationMatrix, 2);

    const availableResourceA = totalResourceA - usedResourceA;
    const availableResourceB = totalResourceB - usedResourceB;
    const availableResourceC = totalResourceC - usedResourceC;

    setAvailableMatrix([availableResourceA, availableResourceB, availableResourceC]);
  };

  const findNeed = () => {
    const newNeedMatrix = allocationMatrix.map((row, i) =>
      row.map((col, j) => parseInt(maxMatrix[i][j]) - parseInt(allocationMatrix[i][j]))
    );
    setNeedMatrix(newNeedMatrix);
  };

  const handleReset = () => {
    setResourceA('');
    setResourceB('');
    setResourceC('');
    setAllocationMatrix(Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => '')));
    setMaxMatrix(Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => '')));
    setNeedMatrix(Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => '')));
    setAvailableMatrix(Array(3).fill(''));
    setSequence('');
  };

  return (
    <div className="bg-black text-white p-4 rounded">
      <h2 className="text-xl mb-4">Banker&#39;s Algorithm Simulation</h2>
      <div className="mb-4">
        <input type="number" id="resourceA" placeholder="Enter resource A" value={resourceA} onChange={handleInputChange} className="bg-gray-800 text-white rounded px-4 py-2 mr-2 mb-2" />
        <input type="number" id="resourceB" placeholder="Enter resource B" value={resourceB} onChange={handleInputChange} className="bg-gray-800 text-white rounded px-4 py-2 mr-2 mb-2" />
        <input type="number" id="resourceC" placeholder="Enter resource C" value={resourceC} onChange={handleInputChange} className="bg-gray-800 text-white rounded px-4 py-2 mr-2 mb-2" />
        <button className="bg-white text-black rounded px-4 py-2" onClick={handleSample}>Sample</button>
      </div>

      {/* Allocation Matrix */}
      <div className="mb-4">
        <h3>Allocation</h3>
        {allocationMatrix.map((row, i) => (
          <div key={i} className="flex mb-2">
            {row.map((col, j) => (
              <input
                key={j}
                type="number"
                value={allocationMatrix[i][j]}
                onChange={(e) => handleAddAllocation(i, j, e.target.value)}
                className="bg-gray-800 text-white rounded px-4 py-2 mr-2"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Max Matrix */}
      <div className="mb-4">
        <h3>Max</h3>
        {maxMatrix.map((row, i) => (
          <div key={i} className="flex mb-2">
            {row.map((col, j) => (
              <input
                key={j}
                type="number"
                value={maxMatrix[i][j]}
                onChange={(e) => handleAddMax(i, j, e.target.value)}
                className="bg-gray-800 text-white rounded px-4 py-2 mr-2"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex mb-4">
        <button className="bg-white text-black rounded px-4 py-2 mr-2" onClick={findAvailable}>Find Available</button>
        <button className="bg-white text-black rounded px-4 py-2 mr-2" onClick={findNeed}>Find Need</button>
        <button className="bg-white text-black rounded px-4 py-2" onClick={findSequence}>Find Sequence</button>
      </div>

      {/* Output */}
      <h3 className="text-lg mt-4">Output</h3>
      <div>
        <p><strong>Available:</strong> {availableMatrix.join(', ')}</p>
        {needMatrix.map((row, i) => (
          <p key={i}><strong>Need {i + 1}:</strong> {row.join(', ')}</p>
        ))}
        <p><strong>Sequence:</strong> {sequence}</p>
      </div>
    </div>
  );
};

export default BankersAlgorithm;
