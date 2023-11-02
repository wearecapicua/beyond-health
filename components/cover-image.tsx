import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";
import cn from "classnames";
import { ImageFieldImage } from "@prismicio/client";

type CoverImageProps = {
  title: string;
  image: ImageFieldImage | null | undefined;
  href?: string;
};

export default function CoverImage({
  title,
  image: imageField,
  href,
}: CoverImageProps) {
  const image = (
    <PrismicNextImage
      /* @ts-ignore */
      field={imageField}
      width={2000}
      height={1000}
      imgixParams={{ fit: "crop", ar: "2:1" }}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": href,
      })}
      alt={imageField?.alt as ""}
      fallbackAlt=""
      priority
    />
  );

  return (
    <div className="sm:mx-0">
      {href ? (
        <Link href={href} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
