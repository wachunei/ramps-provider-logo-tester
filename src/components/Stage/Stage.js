import cx from "classnames";
import usePanelValues from "../../hooks/usePanelValues";
import "./style.css";

export default function Stage({ children }) {
  const { darkMode } = usePanelValues();
  return (
    <div id="stage">
      <div
        id="device-box"
        className={cx({
          dark: darkMode
        })}
      >
        {children}
      </div>
    </div>
  );
}
