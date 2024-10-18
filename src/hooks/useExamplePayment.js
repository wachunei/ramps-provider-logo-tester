import examples from "../examples/payments";

export default function useExamplePayment(name) {
  const example = examples[name ?? "defaultPayment"];
  return example ?? examples.defaultPayment;
}
