import { useState } from "react";
import FormHeader from "../form-header";
import FormSelectorImage from "../form-selector-image";
import { useFormContext } from "react-hook-form";

type ContentType = {
  text: string;
  image: string;
};

export default function StepSix() {
  const [selected, setSelected] = useState("");
  const { formState: { errors } } = useFormContext();

  const content: ContentType[] = [
    {text: "Stage 1", image: "/images/hair_loss_stage1.jpg"},
    {text: "Stage 2", image: "/images/hair_loss_stage1.jpg"},
    {text: "Stage 3", image: "/images/hair_loss_stage1.jpg"},
    {text: "Stage 3 Vertex", image: "/images/hair_loss_stage1.jpg"},
    {text: "Stage 4", image: "/images/hair_loss_stage1.jpg"},
    {text: "Stage 5", image: "/images/hair_loss_stage1.jpg"},
    {text: "Stage 6", image: "/images/hair_loss_stage1.jpg"},
    {text: "Stage 7", image: "/images/hair_loss_stage1.jpg"},
  ]

  return (
    <>
      <FormHeader
        title={"What stage of hair loss are you currently at?"}
        subtitle="Norwood scale"
      />
      <div className="grid grid-cols-2 gap-4 max-w-screen-lg mx-auto">
        {content.map((item, index) => (
          <FormSelectorImage
            key={`text-${index}`}
            label={item.text}
            value={item.text}
            groupId="stage"
            image={item.image}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
      {!!errors.stage && <p className="text-red-500 text-sm text-center pt-3">Please select one</p>}
    </>
  );
}