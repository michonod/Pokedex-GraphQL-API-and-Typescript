import "../styles/globals.css";
import type { AppProps } from "next/app";
import Router from "next/router";
import { Fragment, useState, useEffect } from "react";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  const handleLoading = (arg: boolean) => {
    return () => {
      setLoading(arg);
    };
  };

  const startLoading = handleLoading(true);
  const stopLoading = handleLoading(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  return (
    <Fragment>
      <Component {...pageProps} />
      {loading && <Loading />}
    </Fragment>
  );
}

export default MyApp;
