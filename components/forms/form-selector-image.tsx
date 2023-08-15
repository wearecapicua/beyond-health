import { useFormContext } from "react-hook-form";

type FormSelectorImageProps = {
  selected: string;
  image: string;
  label: string;
  value: string;
  groupId: string;
  setSelected: (text: string) => void;
};

export default function FormSelectorImage({
  selected,
  setSelected,
  image,
  label,
  value,
  groupId
}: FormSelectorImageProps) {
  const { register } = useFormContext();
  
  const selectedStyles = selected === value ? "border-main-light-blue border-[2px]" : "border-gray-400 border-[1px]"
  return (
    <div className={`${selectedStyles} relative my-4 text-main-blue hover:opacity-8 flex w-full rounded-full px-6 py-5 text-xl font-semibold leading-6`}>
      <input
        type="radio"
        id={value}
        value={value}
        {...register(groupId, {
          onChange: (e) => setSelected(e.target.value)
        })}
        className="w-full h-full opacity-0 absolute top-0"
      />
      <div className="w-full flex items-center justify-center gap-12 cursor-pointer">
        <img src={image} className="w-20"/>
        {label}
      </div>
    </div>
  );
}