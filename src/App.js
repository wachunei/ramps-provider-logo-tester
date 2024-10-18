import cx from "classnames";
import Stage from "./components/Stage/Stage";
import Quote from "./components/Quote/Quote";
import PaymentMethod from "./components/PaymentMethod/PaymentMethod";
import Panel from "./components/Panel/Panel";
import usePanelValues from "./hooks/usePanelValues";
import "./styles.css";

export default function App() {
  const { reverseUI, selectedStage } = usePanelValues();
  return (
    <div
      className={cx("App", {
        reversed: reverseUI,
      })}
    >
      <Panel />
      <Stage>
        {selectedStage === "QUOTES" ? (
          <>
            <Quote highlighted />
            <Quote example="wyre" />
            <Quote example="moonpay" />
            <Quote example="transak" />
            <Quote example="banxa" />
            <Quote example="onrampdotmoney" />
            <Quote example="mercuryo" />
            <Quote example="sardine" />
          </>
        ) : null}
        {selectedStage === "PAYMENTS" ? (
          <>
            <PaymentMethod highlighted />
            <PaymentMethod example="applePay" />
            <PaymentMethod example="debitCredit" />
            <PaymentMethod example="instantAch" />
          </>
        ) : null}
      </Stage>
    </div>
  );
}
