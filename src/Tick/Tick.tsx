import React, {useState, useEffect, useCallback, FC} from "react";

import { cn } from "@bem-react/classname";

import { Clock, ClockProps } from './Clock/Clock';

export const Tick: FC<Pick<ClockProps, 'size'>> = ({size}) => {

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setTimeout(() => setDate(new Date), 1000);
  }, [date]);

  return <Clock size={size} date={date}/>;
};