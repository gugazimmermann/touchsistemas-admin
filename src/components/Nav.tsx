import { NavProfile } from ".";

type NavProps = {
  handleSignOut: () => void;
};

const Nav = ({ handleSignOut }: NavProps) => {
  const title: string = process.env.REACT_APP_TITLE || "Touch Sistemas";

  return (
    <header className="w-full shadow-md z-30 px-2 py-1.5">
      <div className="flex flex-wrap justify-between px-2">
        <h1 className="text-2xl">{title}</h1>
        <div className="flex flex-row">
          <NavProfile handleSignOut={handleSignOut} />
        </div>
      </div>
    </header>
  );
};

export default Nav;
