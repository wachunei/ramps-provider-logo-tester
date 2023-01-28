import examples from "../examples";
import usePanelValues from "./usePanelValues";

export default function useExampleLogo(name) {
  const example = examples[name];
  const { darkMode } = usePanelValues();
  const defaultExample = {
    width: 168,
    height: 24,
    style: {
      backgroundColor: darkMode ? "#545454" : "#f5f5f5",
      borderLeft: "1px solid red",
      borderRight: "1px solid red",
    },
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  };
  return example
    ? {
        width: example.width,
        height: example.height,
        src: darkMode ? example.dark : example.light,
      }
    : defaultExample;
}
