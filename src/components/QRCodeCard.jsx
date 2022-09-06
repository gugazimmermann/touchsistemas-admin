import slugify from 'slugify';

export default function QRCodeCard({ QRCode, name, show }) {
	return (
		<div className="bg-white shadow-md rounded-lg sm:w-2/12 flex flex-col justify-around py-2 mb-4">
			<a
				href={QRCode}
				download={`${slugify(`${name}-qrcode`, { lower: true })}.png`}
				className={`w-full flex flex-col justify-center items-center text-secondary ${show && 'cursor-pointer'}`}
			>
				<img src={QRCode} alt="qr code" className="w-6/12 sm:w-full" />
				<h2 className="text-lg font-bold text-center">QR-Code Download</h2>
			</a>
		</div>
	);
}
