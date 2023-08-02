import { SliceZone } from "@prismicio/react";

import { components } from "../slices";
import { PostDocument } from "prismic-types";

type PostBodyProps = {
  slices: PostDocument["data"]["slices"];
};

export default function PostBody({ slices }: PostBodyProps) {
  return (
    <div className="">
      <SliceZone slices={slices} components={components} />
    </div>
  );
}
