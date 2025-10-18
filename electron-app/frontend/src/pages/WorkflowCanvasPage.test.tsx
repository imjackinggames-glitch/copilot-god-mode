import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WorkflowCanvasPage from './WorkflowCanvasPage';

describe('WorkflowCanvasPage', () => {
  it('renders dashboard navigation', () => {
    render(<WorkflowCanvasPage />);
    expect(screen.getByText(/Back to Dashboard/i)).toBeInTheDocument();
  });

  it('navigates to Dashboard when button clicked', () => {
    render(<WorkflowCanvasPage />);
    fireEvent.click(screen.getByText(/Back to Dashboard/i));
    // Add assertion for navigation (mock router or check location)
  });
});
