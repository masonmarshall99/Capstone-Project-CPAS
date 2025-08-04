import 'bulma/css/bulma.min.css';
import React, { useEffect, useState } from 'react';

function App() {
  // For testing, remove in production
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/test').then((res) => res.text()).then((data) => setMessage(data));
  }, []);
  // End of test

  return (
    <div>
      <p class="title">{message}</p>
    </div>
  );
}

export default App;
