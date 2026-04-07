import React from 'react';
import { useStore } from '../../../store/useStore';

const Counter: React.FC = () => {
  const { count, increment, decrement } = useStore();

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold">Counter</h2>
      <p className="my-4">Count: {count}</p>
      <div className="flex space-x-2">
        <button
          onClick={increment}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Increment
        </button>
        <button
          onClick={decrement}
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
