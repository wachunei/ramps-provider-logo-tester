import React from "react";
import cx from "classnames";
import "./style.css";
import Box from "../Box/Box";
import usePanelValues from "../../hooks/usePanelValues";
import useExamplePayment from "../../hooks/useExamplePayment";

export default function PaymentMethod({ highlighted, example }) {
  const { darkMode, showCompactPayment } = usePanelValues();
  const examplePaymentMethod = useExamplePayment(example);
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
        <div>
          {examplePaymentMethod.badges[darkMode ? "dark" : "light"]?.map(
            (badge) => (
              <img key={badge} className={cx("badge")} src={badge} />
            )
          )}
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
