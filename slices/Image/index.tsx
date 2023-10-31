import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { ImageSlice } from "prismic-types";

type ImageProps = SliceComponentProps<ImageSlice>;

const Image = ({ slice }: ImageProps) => {
  return (
    <section className="my-16">
      <PrismicNextImage field={slice.primary.image} layout="responsive" className="rounded-2xl"/>
    </section>
  );
};

export default Image;
