import { useContext } from 'react';
import { AppContext } from '../context';
import { LANGUAGES } from '../constants';

export default function Uploading({ progress }) {
	const { state } = useContext(AppContext);
	console.debug(progress)
	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-90 overflow-y-auto h-full w-full z-50">
			<div className="flex flex-col justify-center items-center h-full w-full">
				<div className="mb-4 text-primary text-2xl font-bold" data-testid="loading">
					{LANGUAGES[state.lang].loading}...
				</div>
				<div className="w-1/2 bg-slate-50 rounded-lg">
					<div style={{ width: `${progress}%` }} className="bg-primary text-center p-0.5 leading-none rounded-l-lg">
						<span className="text-bold text-lg text-slate-50">{`${progress}%`}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
