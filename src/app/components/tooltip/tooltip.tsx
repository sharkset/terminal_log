import React, { useState } from 'react';
import styles from './tooltip.module.scss';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [active, setActive] = useState(false);

  return (
    <span
      className={styles.tooltipContainer}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {children}
      <div className={active ? styles.tooltipText + " " + styles.active : styles.tooltipText}>
        {text}
      </div>
    </span>
  );
};

export default Tooltip;