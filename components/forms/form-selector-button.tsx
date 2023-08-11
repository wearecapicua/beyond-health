import GoogleIcon from "components/goolge-icon";

type FormSelectorButtonProps = {
  selected: string;
  text: string;
  setSelected: (text: string) => void;
};

export default function FormButton({
  selected,
  setSelected,
  text
}: FormSelectorButtonProps) {
  const selectedStyles = selected === text ? "bg-main-light-blue text-white" : "bg-transparent"
  return (
    <div className="py-3">
      <button
        type="button"
        onClick={() => setSelected(text)}
        className={`${selectedStyles} border-[1px] text-main-light-blue border-main-light-blue hover:opacity-8 flex w-full justify-center items-center gap-4 rounded-full px-6 py-3 text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-light-blue-500`}
      >
        {text}
      </button>
    </div>
  );
}