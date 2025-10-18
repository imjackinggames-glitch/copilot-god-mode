import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsPage from './SettingsPage';

describe('SettingsPage', () => {
  it('renders dashboard navigation', () => {
    render(<SettingsPage />);
    expect(screen.getByText(/Back to Dashboard/i)).toBeInTheDocument();
  });

  it('navigates to Dashboard when button clicked', () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByText(/Back to Dashboard/i));
    // Add assertion for navigation (mock router or check location)
  });
});
