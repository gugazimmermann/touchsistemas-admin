export default function Logo({logo, name}) {
  return (
    <div className="w-6/12 sm:w-3/12 mb-4 flex justify-center items-center mx-auto sm:mx-0">
      <div className="bg-white shadow-md overflow-hidden rounded-lg">
        {logo ? (
          <img src={logo} alt="logo" className="object-cover w-full rounded-t-md" />
        ) : (
          <img
            src="/image-placeholder.png"
            alt="logo"
            className="object-scale-down w-full rounded-t-md opacity-10  group-hover:opacity-5"
          />
        )}
        <div className="my-2 text-center">
          <h3 className="font-bold">{name}</h3>
        </div>
      </div>
    </div>
  );
}