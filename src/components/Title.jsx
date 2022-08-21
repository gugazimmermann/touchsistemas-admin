export default function Title({ text, color }) {
	return <h2 className={`${!color ? 'text-primary' : color} font-bold text-xl mb-2`}>{text}</h2>;
}
