import React from 'react';

export default function AgentStudioPage() {
  return (
    <div>
      <h1>Agent Studio Page</h1>
      <button onClick={() => window.location.hash = '#/dashboard'}>
        Back to Dashboard
      </button>
    </div>
  );
}
