import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from './Signup';

describe('Signup Component', () => {
  test('renders Signup component', () => {
    render(<Signup />);
    const headingElement = screen.getByText(/Sign Up/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('handles user input and signup button click', () => {
    render(<Signup />);

    // Select input fields and button
    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const buttonElement = screen.getByText(/Sign Up/i);

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Simulate button click
    fireEvent.click(buttonElement);

    // Check for message or other UI feedback
    const signupMessage = screen.getByText(/Creating account.../i); // Example message
    expect(signupMessage).toBeInTheDocument();
  });
});
