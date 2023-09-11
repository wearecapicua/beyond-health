import FormContainer from "../form-container";
import FormHeader from "../form-header";
import FormInput from "../form-input";
import { useFormStore } from 'store/useFormStore';
import { useFormContext } from "react-hook-form";

export default function StepOne() {
  const { register } = useFormContext();
  const { formStore } = useFormStore();
  return (
    <>
      <FormHeader
        title={"Where would you like us to deliver your package?"}
        subtitle="Your shipment will arrive in a discreet package."
      />
      <FormContainer wide>
        <FormInput
          label="Street Address*"
          id="shippingAddress.addr_line1"
          type="text"
          defaultValue={formStore.shippingAddress?.addr_line1}
        />
        <FormInput
          label="Address Line 2*"
          id="shippingAddress.addr_line2"
          type="text"
          defaultValue={formStore.shippingAddress?.addr_line2}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="City*"
            id="shippingAddress.city"
            type="text"
            defaultValue={formStore.shippingAddress?.city} 
          />
          <FormInput
            label="State / Province*"
            id="shippingAddress.state"
            type="text"
            defaultValue={formStore.shippingAddress?.state} 
          />
        </div>
        <FormInput
          label="ZIP / Postal Code*"
          id="shippingAddress.postal"
          type="text"
          defaultValue={formStore.shippingAddress?.postal} 
        />
        <p className="pt-2.5">{"Delivery Instructions (optional)"}</p>
        <textarea
          id="deliveryInstructions"
          rows={6}
          defaultValue={formStore.deliveryInstructions}
          className="block w-full rounded-3xl border-0 mt-2 py-3 px-6 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...register("deliveryInstructions")}
        />
      </FormContainer>
    </>
  );
}