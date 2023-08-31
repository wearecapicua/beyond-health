import { useFormContext } from "react-hook-form";

type FormSelectorButtonProps = {
  selected: string;
  label: string;
  value: string;
  groupId: string;
  description: string;
  price: string;
  setSelected: (text: string) => void;
};

export default function FormSelectorProduct({
  selected,
  setSelected,
  label,
  value,
  groupId,
  description,
  price
}: FormSelectorButtonProps) {

  const selectedOuterBtn = selected === value ? "border-main-light-blue" : "border-gray-400"
  const selectedInnerBtn = selected === value ? "bg-main-light-blue" : "bg-transparent"
  const { register } = useFormContext();

  return (
    <div className={`${selected === value ? 'bg-blue-500 bg-opacity-5 border-main-light-blue' : 'border-gray-400'} relative my-3 border-[1px] hover:opacity-8 flex w-full rounded-[40px] px-12 py-5 leading-6`}>
      <input
        type="radio"
        id={value}
        value={value}
        {...register(groupId, {
          onChange: (e) => setSelected(e.target.value)
        })}
        className="w-full h-full opacity-0 absolute top-0 cursor-pointer"
       />
      <div className="w-full flex justify-between cursor-pointer items-center">
        <label htmlFor={value}>
          <p className="text-xl font-semibold">{label}</p>
          <p className="text-main-blue font-semibold text-3xl mt-2">{description}</p>
          <p className="font-medium mt-3">{`You will be billed ${price} for every shipment`}</p>
        </label>
        <div className={`${selectedOuterBtn} rounded-full border-[1px]`}>
          <div className={`${selectedInnerBtn} rounded-full border-[3px] border-white p-2`} />
        </div>
      </div>
    </div>
  );
}
