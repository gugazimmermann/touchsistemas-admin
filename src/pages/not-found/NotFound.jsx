import { useContext } from 'react';
import { AppContext } from '../../context';
import { LANGUAGES } from '../../constants';
import NotFoundImg from '../../icons/404.svg';

function NotFound() {
	const { state } = useContext(AppContext);

	return (
		<div className="container bg-white mx-auto">
			<main className="flex h-screen justify-center items-center">
				<div className="flex flex-col w-full items-center text-3xl text-primary">
					<h1 data-testid="title" className="mb-4">
						{LANGUAGES[state.lang].notFound}
					</h1>
					<img src={NotFoundImg} alt="not found" className="max-w-xs" />
				</div>
			</main>
		</div>
	);
}

export default NotFound;
