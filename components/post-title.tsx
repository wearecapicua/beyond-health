type PostTitleProps = {
  children: React.ReactNode
}

export default function PostTitle({ children }: PostTitleProps) {
  return (
    <h3 className="font-bold tracking-tighter leading-tight md:leading-none mt-16 mb-12 text-center">
      {children}
    </h3>
  )
}
