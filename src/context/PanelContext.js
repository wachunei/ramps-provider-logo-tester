import React, { useCallback, useState } from "react";
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
  const [darkMode, setDarkMode] = useState(false);
  const [showQuoteDetails, setShowQuoteDetails] = useState(true);
  const [darkModeSrc, setDarkModeSrc] = useState();
  const [lightModeSrc, setLightModeSrc] = useState();

  const handleDarkModeFileChange = useCallback(async (e) => {
    const file = e.target.files[0];
    const darkModeSrc = await fileToDataURI(file);
    setDarkModeSrc(darkModeSrc);
  }, []);

  const handleLightModeFileChange = useCallback(async (e) => {
    const file = e.target.files[0];

    const lightModeSrc = await fileToDataURI(file);
    setLightModeSrc(lightModeSrc);
  }, []);

  const clearDarkModeSrc = useCallback(() => setDarkModeSrc(), []);
  const clearLightModeSrc = useCallback(() => setLightModeSrc(), []);

  const panelContextValue = {
    darkMode,
    setDarkMode,
    showQuoteDetails,
    setShowQuoteDetails,
    darkModeSrc,
    clearDarkModeSrc,
    handleDarkModeFileChange,
    lightModeSrc,
    clearLightModeSrc,
    handleLightModeFileChange
  };

  return (
    <PanelContext.Provider value={value || panelContextValue} {...props} />
  );
};
