import { screen, render } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('first render', () => {
	test('learn render', () => {
		render(<App />);
		const el = screen.getByText(/learn react/i);
		expect(el).toBeInTheDocument();	
	});
})
