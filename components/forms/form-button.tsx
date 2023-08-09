import GoogleIcon from "components/goolge-icon";

type FormButtonProps = {
  type: "button" | "submit" | "reset" | undefined
  text: string;
  onClick: () => void;
  icon: string;
};

export default function FormButton({
  type,
  text,
  onClick,
  icon
}: FormButtonProps) {
  
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex w-full justify-center items-center gap-4 bg-main-light-blue rounded-full px-6 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-main-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-light-blue-500"
    >
      {icon === "google" ? <GoogleIcon /> : null}
      {text}
    </button>
  );
}