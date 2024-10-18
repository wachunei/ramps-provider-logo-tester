import "./style.css";
import QuotesPanel from "./QuotesPanel";
import usePanelValues from "../../hooks/usePanelValues";

export default function Panel() {
  const {
    setReverseUI,
    selectedStage,
    setSelectedStage,
    darkMode,
    setDarkMode,
    showQuoteDetails,
    setShowQuoteDetails,
    showCompactPayment,
    setShowCompactPayment,
  } = usePanelValues();

  return (
    <div id="side-panel">
      <div className="panel-section">
        <h2>MetaMask Ramps</h2>
        {selectedStage === "QUOTES" && <h3>Provider Logo Tester</h3>}
        {selectedStage === "PAYMENTS" && <h3>Payment Method Tester</h3>}
        <select
          onChange={(e) => setSelectedStage(e.target.value)}
          value={selectedStage}
        >
          <option value="QUOTES">Quotes</option>
          <option value="PAYMENTS">Payments</option>
        </select>
      </div>
      <div className="panel-section">
        <h3>
          Options <button onClick={() => setReverseUI((r) => !r)}>↔️</button>
        </h3>
        <div className="panel-row">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
            Enable dark mode
          </label>
        </div>
        <div className="panel-row">
          {selectedStage === "QUOTES" && (
            <label>
              <input
                type="checkbox"
                checked={showQuoteDetails}
                onChange={(e) => setShowQuoteDetails(e.target.checked)}
              />
              Show quote details
            </label>
          )}
          {selectedStage === "PAYMENTS" && (
            <label>
              <input
                type="checkbox"
                checked={showCompactPayment}
                onChange={(e) => setShowCompactPayment(e.target.checked)}
              />
              Show compact
            </label>
          )}
        </div>
      </div>
      {selectedStage === "QUOTES" && <QuotesPanel />}
    </div>
  );
}
