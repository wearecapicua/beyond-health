import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { ImageSlice } from "prismic-types";

/* @ts-ignore */
type ImageProps = SliceComponentProps<ImageSlice>;

const Image = ({ slice }: ImageProps) => {
  return (
    <section className="my-16">
      {/* @ts-ignore */}
      <PrismicNextImage field={slice.primary.image} alt={slice.primary.image.alt || ''} layout="responsive" className="rounded-2xl"/>
    </section>
  );
};

export default Image;
