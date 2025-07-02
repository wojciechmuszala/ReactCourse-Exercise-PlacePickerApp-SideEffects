import { useState, useEffect } from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const TIMER = 3000;
  const INTERVAL = 10;
  const [remainingTime, setRemainingTime] = useState(TIMER);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevState) => prevState - INTERVAL);
    }, INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    // NOTE: Dodatkowo można zwócić cleanup fct, która wykonuje się przed PONOWNYM wykonanien logiki useEffect, oraz przy odpinaniu komponentu z DOM, ofc. jeżeli dependencies jest puste, useEffect nie wykona się więcej niż raz po pierwszym renderze komponentu
    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id='delete-confirmation'>
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id='confirmation-actions'>
        <button onClick={onCancel} className='button-text'>
          No
        </button>
        <button onClick={onConfirm} className='button'>
          Yes
        </button>
      </div>
      <progress value={remainingTime} max={TIMER} />
    </div>
  );
}
