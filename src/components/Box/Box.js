import "./style.css";
import cx from "classnames";

export default function Box({ highlighted, ...props }) {
  return <div className={cx("box", { highlighted })} {...props} />;
}
