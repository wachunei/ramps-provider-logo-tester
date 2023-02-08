import React, { useCallback, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const PanelContext = React.createContext({});

function fileToDataURI(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (e) => {
      reject(e);
    };
    reader.readAsDataURL(file);
  });
}

export const PanelContextProvider = ({ value, ...props }) => {
  const [reverseUI, setReverseUI] = useLocalStorage(
    "mm-ramps-logo-tester-reverseUI",
    false
  );
  const [darkMode, setDarkMode] = useState(false);
  const [showQuoteDetails, setShowQuoteDetails] = useState(false);
  const [darkModeSrc, setDarkModeSrc] = useState();
  const [lightModeSrc, setLightModeSrc] = useState();

  const handleDarkModeFileChange = useCallback(async (e) => {
    const file = e.target.files[0];
    const darkModeSrc = await fileToDataURI(file);
    setDarkModeSrc(darkModeSrc);
    if (e.target.files[1] && !lightModeSrc) {
      const lightModeSrc = await fileToDataURI(e.target.files[1]);
      setLightModeSrc(lightModeSrc);
    }
  }, []);

  const handleLightModeFileChange = useCallback(async (e) => {
    const file = e.target.files[0];
    const lightModeSrc = await fileToDataURI(file);
    setLightModeSrc(lightModeSrc);
    if (e.target.files[1] && !darkModeSrc) {
      const darkModeSrc = await fileToDataURI(e.target.files[1]);
      setDarkModeSrc(darkModeSrc);
    }
  }, []);

  const clearDarkModeSrc = useCallback(() => setDarkModeSrc(), []);
  const clearLightModeSrc = useCallback(() => setLightModeSrc(), []);
  const clearSrcs = useCallback(() => {
    clearDarkModeSrc();
    clearLightModeSrc();
  }, [clearDarkModeSrc, clearLightModeSrc]);
  const toggleSrcs = useCallback(() => {
    setDarkModeSrc(lightModeSrc);
    setLightModeSrc(darkModeSrc);
  }, [darkModeSrc, lightModeSrc]);

  const panelContextValue = {
    reverseUI,
    setReverseUI,
    darkMode,
    setDarkMode,
    showQuoteDetails,
    setShowQuoteDetails,
    darkModeSrc,
    clearDarkModeSrc,
    handleDarkModeFileChange,
    lightModeSrc,
    clearLightModeSrc,
    handleLightModeFileChange,
    toggleSrcs,
    clearSrcs,
  };

  return (
    <PanelContext.Provider value={value || panelContextValue} {...props} />
  );
};
