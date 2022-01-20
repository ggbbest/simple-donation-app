import React, { useState } from 'react';
import './App.scss';
import DonatePage from './pages/DonatePage';
import SendCeikPage from './pages/SendCeikPage';
// import SendMessagePage from './pages/SendMessagePage';

function App() {
  const [showSendMessagePage, setShowSendMessagePage] = useState(false)

  return (
    <div className="App">
      <header onClick={() => setShowSendMessagePage(!showSendMessagePage)}>
        {showSendMessagePage ? 'KLAY 보내기 ➤' : 'Ceik 보내기 ➤'}
      </header>
      <main>
        {showSendMessagePage ?
          <SendCeikPage /> :
          <DonatePage />
        }
      </main>
    </div>
  );
}

export default App;
