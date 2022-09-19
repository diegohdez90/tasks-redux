import React from 'react';
import Calendar from '../../components/Calendar';
import Recorder from '../../components/Recorder';

const App = () => {
  return (
    <div className='container'>
			<Recorder />
			<Calendar />
    </div>
  );
}

export default App;
