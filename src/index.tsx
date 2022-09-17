import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { AppProvider } from "./context";
import App from "./App";
import "./index.css";

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <CookiesProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </CookiesProvider>
  </BrowserRouter>
);
