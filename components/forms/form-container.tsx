type FormContainerProps = {
  children: React.ReactNode
}

export default function FormContainer({ children }: FormContainerProps) {
  return <div className="max-w-screen-sm mx-auto mt-2 px-3">{children}</div>
}
