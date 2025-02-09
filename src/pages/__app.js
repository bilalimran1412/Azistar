// pages/_app.js
import { ToggleProvider } from "views/Lyro/Configure/ToggleContext";

function MyApp({ Component, pageProps }) {
  return (
    <ToggleProvider>
      <Component {...pageProps} />
    </ToggleProvider>
  );
}

export default MyApp;
