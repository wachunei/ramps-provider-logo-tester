import cx from "classnames";
import Stage from "./components/Stage/Stage";
import Quote from "./components/Quote/Quote";
import Panel from "./components/Panel/Panel";
import usePanelValues from "./hooks/usePanelValues";
import "./styles.css";

export default function App() {
  const { reverseUI } = usePanelValues();
  return (
    <div
      className={cx("App", {
        reversed: reverseUI,
      })}
    >
      <Panel />
      <Stage>
        <Quote highlighted />
        <Quote example="wyre" />
        <Quote example="moonpay" />
        <Quote example="transak" />
      </Stage>
    </div>
  );
}
