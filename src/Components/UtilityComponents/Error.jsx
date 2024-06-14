import React from "react";
import styles from "./Error.module.css"; // Assuming you have CSS module for styling

const Error = ({ message }) => {
  return (
    <div className={styles.error}>
      <h1>{message}</h1>
    </div>
  );
};

export default Error;
