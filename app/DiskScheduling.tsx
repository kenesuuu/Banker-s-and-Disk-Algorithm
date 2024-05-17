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
    if (requests.length === 0) {
      setOutput("No requests to process.");
      return;
    }

    const newSequence: number[] = [];
    let totalHeadMovement = 0;
    let currentPosition = headPosition;

    requests.forEach((request) => {
      newSequence.push(request);
      totalHeadMovement += Math.abs(currentPosition - request);
      currentPosition = request;
    });

    setSequence(newSequence);
    setOutput(`FCFS Sequence: ${newSequence.join(' -> ')}, Total Head Movement: ${totalHeadMovement}`);
  };

  const calculateSCAN = () => {
    if (requests.length === 0) {
      setOutput("No requests to process.");
      return;
    }

    const sortedRequests = [...requests].sort((a, b) => a - b);
    const left = sortedRequests.filter((request) => request <= headPosition).reverse();
    const right = sortedRequests.filter((request) => request > headPosition);

    const newSequence = [...left, ...right];
    let totalHeadMovement = Math.abs(headPosition - left[0]) + Math.abs(left[0] - right[right.length - 1]);

    setSequence(newSequence);
    setOutput(`SCAN Sequence: ${newSequence.join(' -> ')}, Total Head Movement: ${totalHeadMovement}`);
  };

  const calculateCSCAN = () => {
    if (requests.length === 0) {
      setOutput("No requests to process.");
      return;
    }

    const sortedRequests = [...requests].sort((a, b) => a - b);
    const left = sortedRequests.filter((request) => request < headPosition);
    const right = sortedRequests.filter((request) => request >= headPosition);

    const newSequence = [...right, ...left];
    let totalHeadMovement = Math.abs(headPosition - right[0]) + Math.abs(right[right.length - 1] - left[0]) + Math.abs(left[left.length - 1]);

    setSequence(newSequence);
    setOutput(`C-SCAN Sequence: ${newSequence.join(' -> ')}, Total Head Movement: ${totalHeadMovement}`);
  };

  return (
    <div className="bg-black text-white p-4 rounded">
      <h2 className="text-xl mb-4">Disk Scheduling Algorithms</h2>
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

      <div className="flex flex-col gap-2">
        <button className="bg-white text-black rounded px-4 py-2" onClick={calculateFCFS}>Calculate FCFS</button>
        <button className="bg-white text-black rounded px-4 py-2" onClick={calculateSCAN}>Calculate SCAN</button>
        <button className="bg-white text-black rounded px-4 py-2" onClick={calculateCSCAN}>Calculate C-SCAN</button>
      </div>
      <h3 className="text-lg mt-4">Output</h3>
      <p>{output}</p>
    </div>
  );
};

export default DiskScheduling;