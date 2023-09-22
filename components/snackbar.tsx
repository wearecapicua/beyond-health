import React, { useState, useEffect } from 'react';

type SnackbarProps = {
  message: string;
  onClose: () => void;
}

const Snackbar = ({ message, onClose }: SnackbarProps) => {
  const [open, setOpen] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setOpen(false);
  //     onClose();
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [onClose]);

  return open ? (
    <div className="snackbar">
      <p>{message}</p>
    </div>
  ) : null;
};

export default Snackbar;
