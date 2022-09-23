import { ReactElement } from "react";
import { Link } from "react-router-dom";

type TitleProps = {
  text: string;
  className?: string;
  back?: string;
  advanced?: string;
};

const Title = ({ text, className, back, advanced }: TitleProps): ReactElement => {
  return (
    <div className="flex relative">
      {back && (
        <Link to={back} className="flex-none">
          <i className="bx bx-left-arrow-circle text-xl" />
        </Link>
      )}
      <h1
        className={`flex-auto ${!className ? "text-base text-center" : className}`}
      >
        {text.toLocaleUpperCase()}
      </h1>
      {advanced && (
        <Link to={advanced} className="flex items-center absolute right-0">
          Avançado <i className="bx bxs-error-circle text-xl ml-1" />
        </Link>
      )}
    </div>
  );
};

export default Title;
