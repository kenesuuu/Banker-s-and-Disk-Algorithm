import React, { useState } from 'react';

const DiskScheduling = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [headPosition, setHeadPosition] = useState<number>(50);
  const [requests, setRequests] = useState<number[]>([]);
  const [output, setOutput] = useState<string>("");
  const [newRequest, setNewRequest] = useState<string>('');

  const handleAddRequest = () => {
    const request = parseInt(newRequest, 10);
    if (!isNaN(request)) {
      setRequests((prevRequests) => [...prevRequests, request]);
      setNewRequest('');
    } else {
      alert('Please enter a valid number.');
    }
  };

  const calculateFCFS = () => {
    const totalRequests = requests.length;
    if (totalRequests === 0) {
      setOutput("No requests to process.");
      return;
    }

    const newSequence: number[] = [];
    let totalHeadMovement = 0;
    let currentPosition = headPosition;

    for (let i = 0; i < totalRequests; i++) {
      const request = requests[i];
      newSequence.push(request);
      totalHeadMovement += Math.abs(currentPosition - request);
      currentPosition = request;
    }

    setSequence(newSequence);
    setOutput(`Sequence: ${newSequence.join(' -> ')}, Total Head Movement: ${totalHeadMovement}`);
  };

  return (
    <div className="bg-black text-white p-4 rounded">
      <h2 className="text-xl mb-4">Disk Scheduling Algorithm</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newRequest}
          onChange={(e) => setNewRequest(e.target.value)}
          placeholder="Enter disk request"
          className="bg-gray-800 text-white rounded px-4 py-2 mr-2 mb-2"
        />
        <button className="bg-white text-black rounded px-4 py-2" onClick={handleAddRequest}>Add Request</button>
      </div>

      <button className="bg-white text-black rounded px-4 py-2 mb-2" onClick={calculateFCFS}>Calculate FCFS</button>
      
      <h3 className="text-lg mt-4">Output</h3>
      <p>{output}</p>
    </div>
  );
};

export default DiskScheduling;
