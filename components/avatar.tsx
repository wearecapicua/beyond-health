import { PrismicNextImage } from "@prismicio/next";
import { ImageField } from "@prismicio/types";

type AvatarProps = {
  name: string;
  picture: ImageField;
};

export default function Avatar({ name, picture }: AvatarProps) {
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative mr-4">
        <PrismicNextImage
          field={picture}
          className="rounded-full"
          alt={picture.alt as ""}
          fallbackAlt=""
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
