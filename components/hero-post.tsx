import Link from "next/link";
import { DateField } from "@prismicio/types";
import CoverImage from "components/cover-image";
import { ImageFieldImage } from "@prismicio/client";

type HeroPostProps = {
  title: string;
  coverImage: ImageFieldImage | null | undefined;
  date: DateField;
  description: string;
  href: string;
  category: string;
};

export default function HeroPost({
  title,
  coverImage,
  category,
  href,
  description
}: HeroPostProps) {
  return (
    <section>
      <Link href={href || "/"} className="mb-20 block">
        <div className="mb-8 md:mb-16 md:flex rounded-2xl overflow-hidden">
          <div className="w-full md:w-1/2">
          <CoverImage title={title} href={href} image={coverImage} />
          </div>
          <div className="bg-white w-full md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h3 className="mb-6 text-4xl lg:text-6xl lg:leading-tight font-raleway font-bold">
                {title}
              </h3>
              <p className="text-lg mb-6 line-clamp-4 lg:line-clamp-5">{description}</p>
            </div>
            <p className="font-semibold text-sm leading-relaxed">{category}</p>
          </div>
        </div>
      </Link>
    </section>
  )
}
