import { Counter } from "@/components/counter";
import { title } from "@/components/primitives";

export default function PricingPage() {
  return (
    <div>
      <h1 className={title()}>Pricing</h1>
      <>
        <Counter />
      </>
    </div>
  );
}
