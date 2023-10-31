import Link from "next/link";
import { DateField, ImageField, TitleField } from "@prismicio/types";
import { PrismicText } from "@prismicio/react";
import { asText } from "@prismicio/helpers";
import CoverImage from "../components/cover-image";
import Date from "../components/date";

type HeroPostProps = {
  title: string;
  coverImage: ImageField;
  date: DateField;
  description: string;
  href: string;
};

export default function HeroPost({
  title,
  coverImage,
  date,
  href,
  description
}: HeroPostProps) {
  return (
    <section>
      <Link href={href || "/"} className="mb-20 block">
        <div className="mb-8 md:mb-16 flex rounded-2xl overflow-hidden">
          <CoverImage title={title} href={href} image={coverImage} />
          <div className="bg-white w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h3 className="mb-6 text-4xl lg:text-6xl leading-tight font-raleway font-bold">
                {title}
              </h3>
              <p className="text-lg mb-6">{description}</p>
            </div>
            <p className="font-semibold text-sm leading-relaxed">Category</p>
          </div>
        </div>
      </Link>
    </section>
  )
}
