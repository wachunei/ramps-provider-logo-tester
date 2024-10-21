import React from "react";
import cx from "classnames";
import "./style.css";
import Box from "../Box/Box";
import usePanelValues from "../../hooks/usePanelValues";
import useExamplePayment from "../../hooks/useExamplePayment";

export default function PaymentMethod({ highlighted, example }) {
  const { darkMode, showCompactPayment, paymentBadges } = usePanelValues();
  const examplePaymentMethod = useExamplePayment(example);
  const tester = example === "tester";
  return (
    <Box highlighted={highlighted}>
      <div className={cx("row", "title", { dark: darkMode })}>
        <div className={cx("row-left")}>
          <div
            className={cx("payment-icon-wrapper", {
              dark: darkMode,
              compact: showCompactPayment,
            })}
          >
            {examplePaymentMethod.logo &&
              React.createElement(examplePaymentMethod.logo, {
                className: cx("payment-icon", {
                  compact: showCompactPayment,
                  dark: darkMode,
                }),
              })}
          </div>
          <span className={cx("payment-name")}>
            {examplePaymentMethod.name}
          </span>
        </div>
        <div className="badges-wrapper">
          {examplePaymentMethod.badges[darkMode ? "dark" : "light"]?.map(
            (badge) => (
              <img key={badge} className={cx("badge")} src={badge} />
            )
          )}
          {tester &&
            paymentBadges?.map((badgePair) => {
              const badge = badgePair[darkMode ? 1 : 0];
              if (badge) {
                return <img key={badge} className={cx("badge")} src={badge} />;
              }
              return <span className={cx("badge", "empty")} />;
            })}
        </div>
      </div>
      <div className={cx("divider", { compact: showCompactPayment })}></div>
      <div
        className={cx("row", { compact: showCompactPayment, dark: darkMode })}
      >
        {examplePaymentMethod.details}
      </div>
    </Box>
  );
}
