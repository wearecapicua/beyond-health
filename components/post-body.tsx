import { SliceZone } from "@prismicio/react";

import { components } from "../slices";
import { PostDocument } from "prismic-types";

type PostBodyProps = {
  slices: PostDocument["data"]["slices"];
};

export default function PostBody({ slices }: PostBodyProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <SliceZone slices={slices} components={components} />
    </div>
  );
}
