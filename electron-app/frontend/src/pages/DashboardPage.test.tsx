import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardPage from './DashboardPage';

describe('DashboardPage', () => {
  it('renders navigation buttons and links to other pages', () => {
    render(<DashboardPage />);
    expect(screen.getByText(/Go to Agent Studio/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to Settings/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to Workflow Canvas/i)).toBeInTheDocument();
  });

  it('navigates to Agent Studio when button clicked', () => {
    render(<DashboardPage />);
    fireEvent.click(screen.getByText(/Go to Agent Studio/i));
    // Add assertion for navigation (mock router or check location)
  });
});
