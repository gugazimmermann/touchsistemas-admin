import { useContext } from 'react';
import { AppContext } from '../context';
import { LANG } from '../languages/index';
type RememberMeType = {
  remember: boolean;
  setRemember: (remember: boolean) => void;
};

const RememberMe = ({ remember, setRemember }: RememberMeType) => {
  const { state } = useContext(AppContext);

  return (
    <div className="form-group form-check">
      <input
        type="checkbox"
        name="checkbox"
        id="checkbox"
        defaultChecked={remember}
        onChange={() => setRemember(!remember)}
        className="form-checkbox h-4 w-4 rounded-sm text-primary bg-stone-100 border border-stone-400 focus:outline-none focus:ring-offset-0 focus:ring-0 transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
      />
      <label className="form-check-label inline-block cursor-pointer" htmlFor="checkbox">
        {LANG[state.lang].auth.remember}
      </label>
    </div>
  )
};

export default RememberMe;
