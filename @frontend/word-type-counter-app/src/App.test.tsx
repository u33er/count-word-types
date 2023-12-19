/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the component', () => {
    const { getByText, getByLabelText } = render(<App />);

    expect(getByText('Word Type Counts:')).toBeInTheDocument();
    expect(getByLabelText('Textarea')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('handles form submission and displays word type counts', async () => {
    const mockResponse = {
      wordTypeCounts: {
        noun: 3,
        verb: 2,
        adjective: 1,
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const { getByLabelText, getByText } = render(<App />);

    fireEvent.change(getByLabelText('Textarea'), {
      target: { value: 'Test input text' },
    });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('<your-lambda-api-gateway-url>', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: 'Test input text' }),
      });
    });

    expect(getByText('Word Type Counts:')).toBeInTheDocument();
    expect(getByText(/"noun": 3/)).toBeInTheDocument();
    expect(getByText(/"verb": 2/)).toBeInTheDocument();
    expect(getByText(/"adjective": 1/)).toBeInTheDocument();
  });
});
