import React, { useEffect, FC, useMemo, useCallback, useState } from "react";
import { rootCertificates } from "tls";

import { cn } from "../../utils/cn";
import "./Clock.css";

const cls = cn("clock");

const HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export interface ClockProps {
  size: number;
  date: Date;
}

// Часы(этот пидорас решил меня добить после ебучего календаря)

// Полный оборот - 360 градусов - 12 часов

// Часовая стрелка
// за час проходит: 30 градусов
// за минуту проходит: 6 градусов
// за секунду: 1/60 градусов

// Минутная стрелка
// за час проходит: 360 градусов
// за минуту: 6 градусов
// за секунду: 6/60 градусов

// Секундная стрелка:
// за секунду 6 градусов

export const Clock: FC<ClockProps> = ({ size, date }) => {
  //всё работает пиздато, не переживайте

  const [hourRotate, minuteRotate, secondRotate] = useMemo(() => {
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return [
      hours * 30 + minutes * 0.5 + seconds * (0.5 / 60),
      minutes * 6 + (seconds * 6) / 60,
      seconds * 6,
    ];
  }, [date]);

  return (
    <div className={cls()} style={{ width: `${size}px`, height: `${size}px` }}>
      <div className={cls("display")}>
        <div className={cls("center")}></div>
        {Array.from({ length: 60 }).map((_, idx) => {
          return (
            <div
              key={idx}
              className={cls("line-container")}
              style={{ transform: `rotate(${idx * 6}deg)` }}
            >
              <div className={cls("line")}></div>
              {idx % 5 === 0 || idx === 0 ? (
                <div
                  className={cls("number")}
                  style={{ transform: `rotate(${-(idx * 6)}deg)` }}
                >
                  {HOURS[idx / 5]}
                </div>
              ) : null}
            </div>
          );
        })}
        <div
          className={cls("arrow", { type: "hour" })}
          style={{ transform: `rotate(${hourRotate}deg)` }}
        ></div>
        <div
          className={cls("arrow", { type: "minute" })}
          style={{ transform: `rotate(${minuteRotate}deg)` }}
        ></div>
        <div
          className={cls("arrow", { type: "second" })}
          style={{ transform: `rotate(${secondRotate}deg)` }}
        ></div>
      </div>
    </div>
  );
};
