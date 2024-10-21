import React, { useCallback, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const PanelContext = React.createContext({});

const STAGES = {
  QUOTES: "QUOTES",
  PAYMENTS: "PAYMENTS",
};

export const PanelContextProvider = ({ value, ...props }) => {
  const [reverseUI, setReverseUI] = useLocalStorage(
    "mm-ramps-logo-tester-reverseUI",
    false
  );

  const [selectedStage, setSelectedStage] = useLocalStorage(
    "mm-ramps-logo-tester-selectedStage",
    STAGES.QUOTES
  );

  const [darkMode, setDarkMode] = useState(false);
  const [showQuoteDetails, setShowQuoteDetails] = useState(false);
  const [showCompactPayment, setShowCompactPayment] = useState(false);
  const [darkModeSrc, setDarkModeSrc] = useState();
  const [lightModeSrc, setLightModeSrc] = useState();
  const [paymentBadges, setPaymentBadges] = useState([[null, null]]);

  const panelContextValue = {
    reverseUI,
    selectedStage,
    setSelectedStage,
    setReverseUI,
    darkMode,
    setDarkMode,
    showQuoteDetails,
    setShowQuoteDetails,
    showCompactPayment,
    setShowCompactPayment,
    darkModeSrc,
    setDarkModeSrc,
    lightModeSrc,
    setLightModeSrc,
    paymentBadges,
    setPaymentBadges,
  };

  return (
    <PanelContext.Provider value={value || panelContextValue} {...props} />
  );
};
