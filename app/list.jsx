'use client';

import {
  useEffect,
  useState
} from 'react';

export const ListComponent = ({ 
  depth, 
  onListChange
}) => {
  
  const [items, setItems] = useState( 
    x => Array(depth).fill(''));

  useEffect(() => {
    setItems(Array(depth).fill(''));
  }, [
    depth
  ]);

  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
    onListChange(newItems);
  };

  return (
    <div className="p-6 bg-white rounded-lg h-auto shadow-lg">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Criteria</h1>
      <div className="flex flex-col space-y-3">
        {Array.from({ length: depth }, (_, index) => (
          <input 
            key={index} 
            type="text" 
            placeholder={`Item ${index + 1}`} 
            value={items[index] || ''} 
            onChange={(e) => handleItemChange(index, e.target.value)}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" 
          />
        ))}
      </div>
    </div>
  );
};