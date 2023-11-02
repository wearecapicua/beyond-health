import { SliceZone, SliceZoneLike } from "@prismicio/react";
import { components } from "../slices";

type PageBodyProps = {
  slices: SliceZoneLike;
};

export default function PageBody({ slices }: PageBodyProps) {
  return (
    <div>
      <SliceZone slices={slices} components={components} />
    </div>
  );
}
