import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { TextSlice } from 'prismic-types'

type TextProps = SliceComponentProps<TextSlice>

const Text = ({ slice }: TextProps) => {
	return (
		<section className="text-lg leading-relaxed">
			<PrismicRichText
				field={slice.primary.text}
				components={{
					heading2: ({ children }) => <h2 className="mb-4 mt-12 text-3xl leading-snug">{children}</h2>,
					heading3: ({ children }) => <h2 className="mb-4 mt-8 text-2xl leading-snug">{children}</h2>,
					paragraph: ({ children }) => <p className="my-10">{children}</p>,
					list: ({ children }) => <ul className="my-6">{children}</ul>,
					oList: ({ children }) => <ol className="my-6">{children}</ol>
				}}
			/>
		</section>
	)
}

export default Text
