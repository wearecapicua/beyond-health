import { PrismicNextImage } from "@prismicio/next";
import { ImageField } from "@prismicio/types";

type AvatarProps = {
  name?: string;
  picture: ImageField;
};

export default function Avatar({ name, picture }: AvatarProps) {
  return (
    <div className="flex items-center">
      <PrismicNextImage
        field={picture}
        className="rounded-full"
        alt={""}
        fallbackAlt=""
      />
      {name && <div className="text-xl font-bold">{name}</div>}
    </div>
  );
}
