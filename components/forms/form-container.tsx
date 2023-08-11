type FormContainerProps = {
  children: React.ReactNode
}

export default function FormContainer({ children }: FormContainerProps) {
  return <div className="max-w-[520px] mx-auto mt-2 px-3">{children}</div>
}
