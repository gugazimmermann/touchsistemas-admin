import { waitFor, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App tests', () => {
	it(`should contains ${process.env.REACT_APP_TITLE}`, async () => {
		await waitFor(() => {
			render(
				<MemoryRouter>
					<App />
				</MemoryRouter>
			);

			const { getByText } = within(screen.getByTestId('loading'));
			expect(getByText('Carregando...')).toBeInTheDocument();
		});
	});
});
