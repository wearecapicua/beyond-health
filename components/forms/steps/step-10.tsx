import { useState } from "react";
import FormHeader from "../form-header";
import FormSelectorImage from "../form-selector-image";

type ContentType = {
  text: string;
  image: string;
};

export default function StepSix() {
  const [selected, setSelected] = useState("");

  const content: ContentType[] = [
    {text: "No, but i would like to prevent it", image: "/images/hair_loss_stage1.jpg"},
    {text: "No, but i would like to prevent it", image: "/images/hair_loss_stage1.jpg"},
    {text: "No, but i would like to prevent it", image: "/images/hair_loss_stage1.jpg"},
    {text: "No, but i would like to prevent it", image: "/images/hair_loss_stage1.jpg"},
    {text: "No, but i would like to prevent it", image: "/images/hair_loss_stage1.jpg"},
  ]

  return (
    <>
      <FormHeader
        title={"What stage of hair loss are you currently at?"}
        subtitle="Norwood scale"
      />
        {content.map((item, index) => (
          <FormSelectorImage
            key={`text-${index}`}
            text={item.text}
            image={item.image}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
    </>
  );
}