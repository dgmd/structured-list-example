'use client';

import {
  useCallback,
  useState
} from 'react';

import {
  SimpleBarChart
} from './chart.jsx';
import {
  ListComponent,
} from './list.jsx';
import {
  TextArea
} from './textarea.jsx';

export default function Page() {

  const [chartData, setChartData] = useState([]);
  const [text, setText] = useState('');
  const [list, setList] = useState([]);

  const handleEvaluate = useCallback(async () => {
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, list }),
      });
      const data = await response.json();
      console.log('Response:', data);
      setChartData(data);
    }
    catch (error) {
      console.error('Error:', error);
    }
  }, [
    text, 
    list
  ]);

  const setTextCb = useCallback( txt => {
    console.log( 'text', txt );
    setText( x => txt );
  }, [
  ] );

  const setListCb = useCallback( list => {
    console.log( 'list', list );
    setList( x => list );
  }, [
  ] );


  // // Sample data with 5 entries (keys and values)
  // const chartData = [
  //   { name: "A", value: 8 },
  //   { name: "B", value: 6 },
  //   { name: "C", value: 9 },
  //   { name: "D", value: 7 },
  //   { name: "E", value: 5 }
  // ];

  return (
    <div className="p-4">
      <div className="flex space-x-4 items-stretch">
        <ListComponent
          depth={5}
          onListChange={setListCb}
          className="flex-1 min-w-0" />
        <TextArea 
          onChange={setTextCb}
          placeholder="Enter your text here..." 
          className="flex-1 min-w-0" />
        <div
          className="flex items-end">
          <button 
            onClick={handleEvaluate} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition-all duration-200"
          >
            Evaluate
          </button>
        </div>
      </div>
      {
        chartData.length > 0 && 
        <div className="mt-6">
          <SimpleBarChart 
            data={
              chartData
            }
          />
        </div>
      }
    </div>
  );
};