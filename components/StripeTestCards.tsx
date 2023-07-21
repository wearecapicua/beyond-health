const StripeTestCards = () => {
  return (
    <div>
      Use any of the{" "}
      <a
        href="https://stripe.com/docs/testing#cards"
        target="_blank"
        rel="noopener noreferrer"
        className="text-slate-700 underline"
      >
        Stripe test cards
      </a>{" "}
      for this demo, e.g.{" "}
      <div className="inline whitespace-nowrap text-slate-700 font-bold">
        4242
        <span className="inline-block w-1" />
        4242
        <span className="inline-block w-1" />
        4242
        <span className="inline-block w-1" />
        4242
        <span className="inline-block w-1" />
      </div>
    </div>
  );
};

export default StripeTestCards;
