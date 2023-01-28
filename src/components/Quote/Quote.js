import "./style.css";
import cx from "classnames";
import useExampleLogo from "../../hooks/useExampleLogo";
import usePanelValues from "../../hooks/usePanelValues";
import iDark from "./images/i_dark.png";
import iLight from "./images/i_light.png";

export default function Quote({ highlighted, example }) {
  const { darkMode, showQuoteDetails, darkModeSrc, lightModeSrc } =
    usePanelValues();
  const testLogo = darkMode ? darkModeSrc : lightModeSrc;
  const exampleLogo = useExampleLogo(example);
  return (
    <div
      className={cx("quote", {
        highlighted,
      })}
    >
      <div className={cx("row", "title", { dark: darkMode })}>
        <div className="row-left">
          {Boolean(!example && testLogo) ? (
            <img src={testLogo} height="24" alt="Test logo" />
          ) : (
            <img {...exampleLogo} alt="Example logo" />
          )}

          <img
            className="info-icon"
            alt="info-icon"
            src={darkMode ? iDark : iLight}
            width="11"
          />
        </div>
        <div className="row-right">0.0606 ETH</div>
      </div>
      {showQuoteDetails ? (
        <>
          <div className={cx("row", { dark: darkMode })}>
            <div className="row-left">Price USD</div>
            <div className="row-right">≈ $95.87 USD</div>
          </div>
          <div className={cx("row", { dark: darkMode })}>
            <div className="row-left">Total Fees</div>
            <div className="row-right">$4.13 USD</div>
          </div>
          <div className={cx("row", "inner", { dark: darkMode })}>
            <div className="row-left">Processing Fee</div>
            <div className="row-right">$3.6 USD</div>
          </div>
          <div className={cx("row", "inner", { dark: darkMode })}>
            <div className="row-left">Network Fee</div>
            <div className="row-right">$0.53 USD</div>
          </div>
          <div className={cx("row", { dark: darkMode })}>
            <div className="row-left">Total</div>
            <div className="row-right">$100 USD</div>
          </div>
        </>
      ) : null}
    </div>
  );
}
