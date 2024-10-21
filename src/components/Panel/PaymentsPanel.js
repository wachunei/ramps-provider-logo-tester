import { useCallback } from "react";
import cx from "classnames";
import usePanelValues from "../../hooks/usePanelValues";
import { fileToDataURI } from "../../utils";

export default function PaymentsPanel() {
  const { paymentBadges, setPaymentBadges } = usePanelValues();

  const handleRemoveAll = useCallback(() => {
    setPaymentBadges([[null, null]]);
  }, [setPaymentBadges]);

  const handleAddBadge = useCallback(() => {
    setPaymentBadges((prev) => [...prev, [null, null]]);
  }, [setPaymentBadges]);

  const handleFileChange = useCallback(
    async (event, mode, index) => {
      const file = event.target.files[0];
      const src = await fileToDataURI(file);
      const indexToUpdate = mode === "light" ? 0 : 1;
      const otherIndex = 1 - indexToUpdate;
      let otherSrc = paymentBadges[index][otherIndex];
      if (event.target.files[1] && !otherSrc) {
        otherSrc = await fileToDataURI(event.target.files[1]);
      }
      const newSrcs = indexToUpdate === 0 ? [src, otherSrc] : [otherSrc, src];
      setPaymentBadges((prev) => {
        const newBadges = [
          ...prev.slice(0, index),
          newSrcs,
          ...prev.slice(index + 1),
        ];
        return newBadges;
      });
    },
    [setPaymentBadges, paymentBadges]
  );

  const handleRemoveBadge = useCallback(
    (mode, index) => {
      const indexToRemove = mode === "light" ? 0 : 1;
      setPaymentBadges((prev) => {
        const newBadges = [
          ...prev.slice(0, index),
          [
            ...prev[index].slice(0, indexToRemove),
            null,
            ...prev[index].slice(indexToRemove + 1),
          ],
          ...prev.slice(index + 1),
        ];
        return newBadges;
      });
    },
    [setPaymentBadges]
  );

  const handleRemoveBothBadges = useCallback(
    (index) => {
      setPaymentBadges((prev) => {
        const newBadges = [...prev.slice(0, index), ...prev.slice(index + 1)];
        return newBadges;
      });
    },
    [setPaymentBadges]
  );

  const handleSwap = useCallback(
    (index) => {
      setPaymentBadges((prev) => {
        const newBadges = [
          ...prev.slice(0, index),
          [prev[index][1], prev[index][0]],
          ...prev.slice(index + 1),
        ];
        return newBadges;
      });
    },
    [setPaymentBadges]
  );
  const handleClear = useCallback(
    (index) => {
      setPaymentBadges((prev) => {
        const newBadges = [
          ...prev.slice(0, index),
          [null, null],
          ...prev.slice(index + 1),
        ];
        return newBadges;
      });
    },
    [setPaymentBadges]
  );

  return (
    <>
      <div className="panel-section">
        <h3>Badges</h3>

        <div className="panel-row">
          <button onClick={handleAddBadge}>➕ Add Badge</button>{" "}
          <button
            onClick={handleRemoveAll}
            disabled={paymentBadges.length === 1}
          >
            ❌ Remove All
          </button>
        </div>
      </div>
      {paymentBadges.map((badgePair, i, array) => (
        <>
          <div key={i} className="panel-section">
            <h3 className="badge-title-counter">#{i + 1}</h3>{" "}
            <button
              onClick={() => handleSwap(i)}
              disabled={!badgePair.some(Boolean)}
            >
              🔁 Swap
            </button>{" "}
            <button
              onClick={() => handleClear(i)}
              disabled={!badgePair.some(Boolean)}
            >
              🗑️ Clear
            </button>{" "}
            {array.length > 1 && (
              <button onClick={() => handleRemoveBothBadges(i)}>
                ❌ Remove
              </button>
            )}
          </div>
          <div key={i} className="panel-section nested">
            <div className="panel-row">
              <strong>Light Mode Image</strong>
            </div>
            <div className="panel-row">
              <img
                className={cx({
                  invisible: !badgePair[0],
                })}
                src={badgePair[0]}
                height={20}
                onLoad={() => {}}
              />
            </div>
            <div className="panel-row">
              {badgePair[0] ? (
                <button onClick={() => handleRemoveBadge("light", i)}>
                  Remove Image
                </button>
              ) : (
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "light", i)}
                  accept="image/*"
                  multiple
                />
              )}
            </div>
          </div>
          <div className="panel-section dark nested">
            <div className="panel-row">
              <strong>Dark Mode Image</strong>
            </div>
            <div className="panel-row">
              <img
                className={cx({
                  invisible: !badgePair[1],
                })}
                src={badgePair[1]}
                height={20}
                onLoad={() => {}}
              />
            </div>
            <div className="panel-row">
              {badgePair[1] ? (
                <button onClick={() => handleRemoveBadge("dark", i)}>
                  Remove Image
                </button>
              ) : (
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, "dark", i)}
                  accept="image/*"
                  multiple
                />
              )}
            </div>
          </div>
        </>
      ))}
    </>
  );
}
