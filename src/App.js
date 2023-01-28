import Stage from "./components/Stage/Stage";
import Quote from "./components/Quote/Quote";
import Panel from "./components/Panel/Panel";
import "./styles.css";
import { PanelContextProvider } from "./context/PanelContext";

export default function App() {
  return (
    <PanelContextProvider>
      <div className="App">
        <Stage>
          <Quote highlighted />
          <Quote example="wyre" />
          <Quote example="moonpay" />
          <Quote example="transak" />
        </Stage>
        <Panel />
      </div>
    </PanelContextProvider>
  );
}
