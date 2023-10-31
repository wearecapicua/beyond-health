import Link from "next/link";
import { DateField, ImageField } from "@prismicio/types";
import Image from 'next/image'
import { AuthorContentRelationshipField } from "../lib/types";

type PostPreviewProps = {
  title: string;
  coverImage: ImageField;
  date: DateField;
  description: string;
  author: AuthorContentRelationshipField;
  href: string;
};

export default function PostPreview({
  title,
  coverImage,
  href
}: PostPreviewProps) {
  return (
    <Link href={href} className="inline-block">
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="h-56 relative">
          <Image src={coverImage} fill={true}  style={{objectFit: "cover"}} />
        </div>
        <div className="h-40 bg-white p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-raleway font-medium text-2xl leading-snug line-clamp-2">
              {title}
            </h3>
          </div>
          <p className="font-semibold text-sm leading-relaxed">Category</p>
        </div>
      </div>
    </Link>
  );
}
