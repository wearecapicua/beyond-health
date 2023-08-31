type FormContainerProps = {
  children: React.ReactNode
  wide?: boolean
}

export default function FormContainer({ children, wide }: FormContainerProps) {
  return <div className={`${wide ? 'max-w-[750px]' : 'max-w-[520px]'} mx-auto my-2 px-3`}>{children}</div>
}
