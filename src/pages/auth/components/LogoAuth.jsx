import LogoIcon from '../../../images/LogoIcon';

export default function LogoAuth({ styles }) {
	return (
		<div className={`flex flex-col w-full items-center text-3xl ${styles}`}>
			<LogoIcon styles="h-16 w-16" />
			<h1 data-testid="app_title">{process.env.REACT_APP_TITLE}</h1>
		</div>
	);
}
