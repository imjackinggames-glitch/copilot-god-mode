import React from 'react';

export default function WorkflowCanvasPage() {
  return (
    <div>
      <h1>Workflow Canvas Page</h1>
      <button onClick={() => window.location.hash = '#/dashboard'}>
        Back to Dashboard
      </button>
    </div>
  );
}
