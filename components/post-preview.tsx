import Link from "next/link";
import { DateField } from "@prismicio/types";
import Image from 'next/image'
import { AuthorContentRelationshipField } from "../lib/types";

type PostPreviewProps = {
  title: string;
  coverImage: any;
  href: string;
  category: string;
};

export default function PostPreview({
  title,
  coverImage,
  href,
  category
}: PostPreviewProps) {
  return (
    <Link href={href} className="inline-block">
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="h-56 relative">
          <Image alt={title} src={coverImage} fill={true} style={{objectFit: "cover"}} />
        </div>
        <div className="h-40 bg-white p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-raleway font-medium text-2xl leading-snug line-clamp-2">
              {title}
            </h3>
          </div>
          <p className="font-semibold text-sm leading-relaxed">{category}</p>
        </div>
      </div>
    </Link>
  );
}
