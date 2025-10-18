import React from 'react';

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings Page</h1>
      <button onClick={() => window.location.hash = '#/dashboard'}>
        Back to Dashboard
      </button>
    </div>
  );
}
