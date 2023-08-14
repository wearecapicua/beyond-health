type FormSelectorButtonProps = {
  selected: string;
  label: string;
  value: string;
  id: string;
  setSelected: (text: string) => void;
};

export default function FormButton({
  selected,
  setSelected,
  label,
  value,
  id
}: FormSelectorButtonProps) {
  //const selectedStyles = selected === text ? "bg-main-light-blue text-white" : "bg-transparent"
  const handleChange = (value) => {
    setSelected(value);
  };

  return (
    <div
          key={value}
          className="relative my-4 bg-white border-[1px] text-main-blue border-gray-400 rounded-full px-6 py-8 text-xl font-semibold leading-6"
        >
          <input
            type="radio"
            id={value}
            value={value}
            checked={selected === value}
            onChange={() => handleChange(value)}
            className="w-full h-full opacity-0 absolute"
          />
          <label
            htmlFor={value}
            className={`absolute inset-0 flex items-center justify-center cursor-pointer ${
              selected === value
                ? "bg-main-light-blue text-white"
                : "text-main-blue border-[1px] border-gray-400"
            } rounded-full`}
          >
            {label}
          </label>
        </div>
    // <div className="py-3">
    //   <button
    //     type="button"
    //     onClick={() => setSelected(text)}
    //     className={`${selectedStyles} border-[1px] text-main-blue border-gray-400 hover:opacity-8 flex w-full justify-center items-center gap-4 rounded-full px-6 py-5 text-xl font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-light-blue-500`}
    //   >
    //     {text}
    //   </button>
    // </div>
  );
}