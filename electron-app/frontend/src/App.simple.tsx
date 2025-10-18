import React from 'react';

function App() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0a0a0a',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
        ⚡ Copilot God Mode
      </h1>
      <p style={{ fontSize: '24px', opacity: 0.7 }}>
        React está funcionando!
      </p>
      <p style={{ fontSize: '16px', marginTop: '40px', opacity: 0.5 }}>
        Versão de teste - Frontend carregado com sucesso
      </p>
    </div>
  );
}

export default App;
