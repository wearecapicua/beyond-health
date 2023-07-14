import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../lib/prismic";
import "../styles/index.css";
import App, { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <PrismicPreview repositoryName={repositoryName}>
      <Component {...pageProps} />
    </PrismicPreview>
  );
};

export default MyApp;
