'use client';

import {
  useCallback,
  useState
} from 'react';

export const TextArea = ({ 
  onChange, 
  placeholder,
  className
}) => {
  const [text, setText] = useState('');

  const handleTextChangeCb = useCallback((event) => {
    const newText = event.target.value;
    setText( x => newText);
    onChange(newText);
  }, [
    onChange
  ]);

  return (
    <div 
      className={`p-6 bg-white rounded-lg shadow-lg flex flex-col ${className}`}>
      <h1 
        className="text-xl font-bold mb-4 text-gray-800">
          Text
      </h1>
      <textarea
        className="w-full flex-1 p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
        onChange={handleTextChangeCb}
        placeholder={placeholder}
        style={{ resize: 'none' }}
        value={ text }
      />
    </div>
  );
};