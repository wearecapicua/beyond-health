import { ImageFieldImage } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

type AvatarProps = {
  name?: string;
  picture: ImageFieldImage | null | undefined;
};

export default function Avatar({ name, picture }: AvatarProps) {
  return (
    <div className="flex items-center">
      <PrismicNextImage
        /* @ts-ignore */
        field={picture}
        className="rounded-full"
        alt={""}
        fallbackAlt=""
      />
      {name && <div className="text-xl font-bold">{name}</div>}
    </div>
  );
}
