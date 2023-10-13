type ContainerProps = {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <div className="container mx-auto max-w-[1320px] sm:px-5">{children}</div>
}
