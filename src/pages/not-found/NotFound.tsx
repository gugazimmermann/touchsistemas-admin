import { useContext } from "react";
import { AppContext } from "../../context";
import { LANG } from "../../languages/index";

const NotFound = () => {
  const { state } = useContext(AppContext);

  return (
    <div className="container bg-white mx-auto">
      <main className="flex flex-col h-screen justify-center items-center">
        <img
          src="/android-chrome-192x192.png"
          alt="logo"
          width={192}
          height={192}
        />
        <h1 className="mt-4 text-xl text-primary font-bold">
          {LANG[state.lang].notFound}
        </h1>
      </main>
    </div>
  );
};

export default NotFound;
