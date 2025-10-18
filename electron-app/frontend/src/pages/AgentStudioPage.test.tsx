import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AgentStudioPage from './AgentStudioPage';

describe('AgentStudioPage', () => {
  it('renders dashboard navigation', () => {
    render(<AgentStudioPage />);
    expect(screen.getByText(/Back to Dashboard/i)).toBeInTheDocument();
  });

  it('navigates to Dashboard when button clicked', () => {
    render(<AgentStudioPage />);
    fireEvent.click(screen.getByText(/Back to Dashboard/i));
    // Add assertion for navigation (mock router or check location)
  });
});
