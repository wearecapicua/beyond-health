type FormErrorProps = {
  id: string;
  errors: any;
  text: string;
};

export default function ErrorComponent({ id, errors, text }: FormErrorProps) {
  if (id.includes(".")) {
    const [key, subId] = id.split(".");
    return (
      <>
        {!!errors[key]?.[subId] && (
          <p className="text-red-500 text-sm pt-2">{text}</p>
        )}
      </>
    )
  } else {
    return (
      <>
        {!!errors[id] && (
          <p className="text-red-500 text-sm pt-2">{text}</p>
        )}
      </>
    )
  }
  
}
