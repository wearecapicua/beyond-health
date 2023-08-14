import { useState } from "react";
import FormHeader from "../form-header";
import FormSelectorImage from "../form-selector-image";

export default function StepSix() {
  const [selected, setSelected] = useState("");

  const content = [
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
        {content.map((text, index) => (
          <FormSelectorImage
            key={`text-${index}`}
            text={content.text}
            image={content.image}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
    </>
  );
}