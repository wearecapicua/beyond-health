import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { StarIcon } from '@heroicons/react/20/solid';

/**
 * Props for `Reviews`.
 */
export type ReviewsProps = SliceComponentProps<Content.ReviewsSlice>;

/**
 * Component for "Reviews" Slices.
 */
const Reviews = ({ slice }: ReviewsProps): JSX.Element => {
  const { items } = slice

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="max-w-[1180px] mx-auto py-10">
        <div className="flex gap-5">
          {items.map((item: any, index) => {
            const starCount = parseInt(item.review.data.rating);
            return (
              <div key={index} className="relative flex-1 h-426 bg-white py-10 px-6 rounded-3xl">
                <div className="flex justify-between mb-10">
                  <span className="text-[22px] font-semibold font-raleway">{item.review.data.name}</span>
                  <div className="flex gap-1">
                    {Array.from({ length: starCount }).map((_, index) => (
                      <StarIcon key={index} className="h-5 w-5 text-accent-green" />
                    ))}
                  </div>
                </div>
                <p className="text-xl tracking-wide">{item.review.data.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
