import { useEffect, useState } from "react";
import FormHeader from "../form-header";
import FormSelectorImage from "../form-selector-image";
import { useFormContext } from "react-hook-form";
import { useFormStore } from 'store/useFormStore';

type ContentType = {
  text: string;
  image: string;
};

export default function StepSix() {
  const [selected, setSelected] = useState("");
  const { setValue, formState: { errors } } = useFormContext();
  const { formStore } = useFormStore();

  useEffect(() => {
    if (!selected && formStore.stage) {
      setSelected(formStore.stage);
      setValue("stage", formStore.stage)
    }
  }, [formStore.stage]);

  const content: ContentType[] = [
    {text: "Stage 1", image: "/images/stage1.jpg"},
    {text: "Stage 2", image: "/images/stage2.jpg"},
    {text: "Stage 3", image: "/images/stage3.jpg"},
    {text: "Stage 3 Vertex", image: "/images/stage3_vertex.jpg"},
    {text: "Stage 4", image: "/images/stage4.jpg"},
    {text: "Stage 5", image: "/images/stage5.jpg"},
    {text: "Stage 6", image: "/images/stage6.jpg"},
    {text: "Stage 7", image: "/images/stage7.jpg"},
  ]

  return (
    <>
      <FormHeader
        title={"What stage of hair loss are you currently at?"}
        subtitle="Norwood scale"
      />
      <div className="md:grid md:grid-cols-2 gap-4 max-w-screen-lg mx-auto px-6 md:px-3">
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