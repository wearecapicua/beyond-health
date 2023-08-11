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
  const selectedStyles = selected === text ? "bg-main-light-blue" : "bg-transparent"
  return (
    <div className="py-3">
      <button
        onClick={() => setSelected(text)}
        className="flex justify-between border-[1px] text-main-blue border-gray-400 hover:opacity-8 flex w-full justify-center items-center gap-4 rounded-full px-6 py-5 text-xl font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-light-blue-500"
      >
        {text}
        <div className={`${selectedStyles} rounded-full border-[1px] p-3 border-gray-400`} />
      </button>
    </div>
  );
}