import { useMemo, useRef, useState } from "react";
import cx from "classnames";
import usePanelValues from "../../hooks/usePanelValues";
import "./style.css";

export default function Panel() {
  const {
    setReverseUI,
    darkMode,
    setDarkMode,
    showQuoteDetails,
    setShowQuoteDetails,
    lightModeSrc,
    darkModeSrc,
    clearLightModeSrc,
    clearDarkModeSrc,
    handleLightModeFileChange,
    handleDarkModeFileChange,
    toggleSrcs,
    clearSrcs,
  } = usePanelValues();

  const lightSrcRef = useRef();
  const darkSrcRef = useRef();

  const [lightSrcLoaded, setLightSrcLoaded] = useState(false);
  const [darkSrcLoaded, setDarkSrcLoaded] = useState(false);

  if (!lightModeSrc && lightSrcLoaded) {
    setLightSrcLoaded(false);
  }

  if (!darkModeSrc && darkSrcLoaded) {
    setDarkSrcLoaded(false);
  }

  const sizes = useMemo(() => {
    if (
      !lightSrcRef.current ||
      !darkSrcRef.current ||
      !lightSrcLoaded ||
      !darkSrcLoaded
    )
      return null;

    const lightModeWidth = lightSrcRef.current.width;
    const lightModeHeight = lightSrcRef.current.height;
    const darkModeWidth = darkSrcRef.current.width;
    const darkModeHeight = darkSrcRef.current.height;

    return {
      matches:
        lightModeWidth === darkModeWidth && lightModeHeight === darkModeHeight,
      lightModeWidth,
      lightModeHeight,
      darkModeWidth,
      darkModeHeight,
    };
  }, [
    lightModeSrc,
    darkModeSrc,
    lightSrcLoaded,
    darkSrcLoaded,
    lightSrcRef.current?.width,
    lightSrcRef.current?.height,
    darkSrcRef.current?.width,
    darkSrcRef.current?.height,
  ]);

  return (
    <div id="side-panel">
      <div className="panel-section">
        <h2>MetaMask Ramps Provider Logo Tester</h2>{" "}
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
          <label>
            <input
              type="checkbox"
              checked={showQuoteDetails}
              onChange={(e) => setShowQuoteDetails(e.target.checked)}
            />
            Show quote details
          </label>
        </div>
      </div>
      <div className="panel-section">
        <h3>Images</h3>
        <div className="panel-row">
          <p>
            Use <code>.svg</code> images <strong>24px</strong> tall.
          </p>
        </div>

        <div className="panel-row">
          <button onClick={toggleSrcs} disabled={!lightModeSrc && !darkModeSrc}>
            🔃 Swap
          </button>{" "}
          <button onClick={clearSrcs} disabled={!lightModeSrc && !darkModeSrc}>
            🗑️ Clear
          </button>
        </div>
      </div>
      <div className="panel-section">
        <div className="panel-row">
          <strong>Light Mode Image</strong>
        </div>
        <div className="panel-row">
          <img
            className={cx({
              invisible: !lightModeSrc,
            })}
            src={lightModeSrc}
            height="24"
            alt="Provider Logo"
            ref={lightSrcRef}
            onLoad={() => setLightSrcLoaded(true)}
          />
        </div>
        <div className="panel-row">
          {lightModeSrc ? (
            <button onClick={clearLightModeSrc}>Remove Image</button>
          ) : (
            <input
              type="file"
              onChange={handleLightModeFileChange}
              accept="image/*"
              multiple
            />
          )}
        </div>
      </div>
      <div className="panel-section dark">
        <div className="panel-row">
          <strong>Dark Mode Image</strong>
        </div>
        <div className="panel-row">
          <img
            className={cx({
              invisible: !darkModeSrc,
            })}
            src={darkModeSrc}
            height="24"
            alt="Provider Logo"
            ref={darkSrcRef}
            onLoad={() => setDarkSrcLoaded(true)}
          />
        </div>
        <div className="panel-row">
          {darkModeSrc ? (
            <button onClick={clearDarkModeSrc}>Remove Image</button>
          ) : (
            <input
              type="file"
              onChange={handleDarkModeFileChange}
              accept="image/*"
              multiple
            />
          )}
        </div>
      </div>
      {sizes ? (
        <div className="panel-section">
          <h3>Dimensions</h3>

          {sizes.matches ? (
            <>
              <div className="panel-row">
                <p>✅ Light and dark images have the same size</p>
              </div>
              <div className="panel-row">
                Logo dimensions are:{" "}
                <strong>
                  {sizes.lightModeWidth} x {sizes.lightModeHeight}
                </strong>
              </div>
              <div className="panel-row">
                Exported <code>.png</code> files @ 3x must be{" "}
                <strong>
                  {sizes.lightModeWidth * 3} x {sizes.lightModeHeight * 3}
                </strong>{" "}
                pixels
              </div>
            </>
          ) : (
            <>
              ❌ Light and dark images have different sizes
              <ul>
                <li>
                  Light Mode: {sizes.lightModeWidth} x {sizes.lightModeHeight}
                </li>
                <li>
                  Dark Mode: {sizes.darkModeWidth} x {sizes.darkModeHeight}
                </li>
              </ul>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
