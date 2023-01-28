import { useContext } from "react";
import { PanelContext } from "../context/PanelContext";

export default function usePanelValues() {
  return useContext(PanelContext);
}
