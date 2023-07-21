import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../lib/prismic";
import "../styles/index.css";
import App, { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <PrismicPreview repositoryName={repositoryName}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </PrismicPreview>
  );
};

export default MyApp;
