import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { ImageSlice } from "prismic-types";

/* @ts-ignore */
type ImageProps = SliceComponentProps<ImageSlice>;

const Image = ({ slice }: ImageProps) => {
  return (
    <section className="my-12">
      <PrismicNextImage 
        field={slice.primary.image} 
        layout="responsive" 
      />
    </section>
  );
};

export default Image;
