import usePanelValues from "../../hooks/usePanelValues";
import "./style.css";
export default function Panel() {
  const {
    darkMode,
    setDarkMode,
    showQuoteDetails,
    setShowQuoteDetails,
    lightModeSrc,
    darkModeSrc,
    clearLightModeSrc,
    clearDarkModeSrc,
    handleLightModeFileChange,
    handleDarkModeFileChange
  } = usePanelValues();

  return (
    <div id="side-panel">
      <div className="panel-section">
        <h2>Provider Logo Tester</h2>
      </div>
      <div className="panel-section">
        <h3>Options</h3>
        <div className="panel-row">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
            Enable Dark Mode
          </label>
        </div>
        <div className="panel-row">
          <label>
            <input
              type="checkbox"
              checked={showQuoteDetails}
              onChange={(e) => setShowQuoteDetails(e.target.checked)}
            />
            Show Quote details
          </label>
        </div>
      </div>
      <div className="panel-section">
        <div className="panel-row">
          <h3>Images</h3>
          <p>
            Use <code>.svg</code> images <strong>24px</strong> tall.
          </p>
        </div>
      </div>
      <div className="panel-section">
        <div className="panel-row">
          <strong>Light Mode Image</strong>
        </div>
        <div className="panel-row">
          {lightModeSrc ? (
            <>
              <img src={lightModeSrc} height="24" alt="Provider Logo" />
              <div>
                <button onClick={clearLightModeSrc}>Remove Image</button>
              </div>
            </>
          ) : (
            <input
              type="file"
              onChange={handleLightModeFileChange}
              accept="image/*"
            />
          )}
        </div>
      </div>

      <div className="panel-section dark">
        <div className="panel-row">
          <strong>Dark Mode Image</strong>
        </div>
        <div className="panel-row">
          {darkModeSrc ? (
            <>
              <img src={darkModeSrc} height="24" alt="Provider Logo" />
              <div>
                <button onClick={clearDarkModeSrc}>Remove Image</button>
              </div>
            </>
          ) : (
            <input
              type="file"
              onChange={handleDarkModeFileChange}
              accept="image/*"
            />
          )}
        </div>
      </div>
    </div>
  );
}
