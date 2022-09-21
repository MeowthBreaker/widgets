import React, { ReactNode, FC } from "react";

import { cn } from "../utils/cn";
import './Arrows.css';

const cls = cn("arrows");

interface ArrowsProps {
  children?: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
}

export const Arrows: FC<ArrowsProps> = ({ children, onBack, onNext }) => {
  return (
    <div className={cls()}>
      {onBack && <div className={cls("arrow", { side: "left" })} onClick={onBack}/>}
      {children}
      {onNext && <div className={cls("arrow", { side: "right" })} onClick={onNext}/>}
    </div>
  );
};
