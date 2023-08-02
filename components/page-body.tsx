import { SliceZone } from "@prismicio/react";

import { components } from "../slices";
import { PostDocument } from "prismic-types";

type PageBodyProps = {
  slices: PostDocument["data"]["slices"];
};

export default function PageBody({ slices }: PageBodyProps) {
  return (
    <div>
      <SliceZone slices={slices} components={components} />
    </div>
  );
}
