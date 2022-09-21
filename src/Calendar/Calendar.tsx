import React, {
  FC,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ChangeEvent,
} from "react";
import "./Calendar.css";
import { Arrows } from "../Arrows/Arrows";

import { cn } from "../utils/cn";

const cls = cn("calendar");

interface CalendarProps {
  date?: Date;
}

const MONTHS: string[] = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const getProperDay = (day: number): number => (day === 0 ? 6 : day - 1);

export const Calendar: FC<CalendarProps> = ({ date: originalDate }) => {
  const [date, setDate] = useState(originalDate || new Date());

  useEffect(() => {
    if (originalDate && originalDate !== date) {
      setDate(originalDate);
    }
  }, [date, originalDate]);

  const currentMonth = useMemo(() => MONTHS[date.getMonth()], [date]);

  const year = useMemo(() => date.getFullYear(), [date]);

  const days = useMemo(
    () => new Date(year, date.getMonth() + 1, 0).getDate(),
    [date]
  );

  const calendarList = useMemo(() => {
    let firstDay = -getProperDay(new Date(year, date.getMonth(), 1).getDay());

    let arr = Array.from({ length: 6 }).map(() => Array.from({ length: 7 }));

    return arr.map((week) => {
      return week.map(() => {
        if (firstDay >= 0 && firstDay < days) {
          return ++firstDay;
        }

        firstDay++;
        return "";
      });
    });
  }, [date]);

  const setPrevMonth = useCallback(() => {
    const newYear =
      date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear();
    const newMonth = date.getMonth() === 0 ? 11 : date.getMonth() - 1;

    setDate(new Date(newYear, newMonth));
  }, [date]);

  const setNextMonth = useCallback(() => {
    const newYear =
      date.getMonth() === 11 ? date.getFullYear() + 1 : date.getFullYear();
    const newMonth = date.getMonth() === 11 ? 0 : date.getMonth() + 1;

    setDate(new Date(newYear, newMonth));
  }, [date]);

  const onMonthChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDate(new Date(year, MONTHS.indexOf(e.target.value)));
    },
    [date]
  );

  const onYearChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDate(new Date(parseInt(e.target.value), MONTHS.indexOf(currentMonth)));
    },
    [date]
  );

  return (
    <div className={cls()}>
      <div className={cls("display")}>
        <table>
          <tr>
            <th className={cls("day-title")}>ПН</th>
            <th className={cls("day-title")}>ВТ</th>
            <th className={cls("day-title")}>СР</th>
            <th className={cls("day-title")}>ЧТ</th>
            <th className={cls("day-title")}>ПТ</th>
            <th className={cls("day-title", { weekend: true })}>СБ</th>
            <th className={cls("day-title", { weekend: true })}>ВС</th>
          </tr>
          {calendarList.map((week) => (
            <tr>
              {week.map((day) => (
                <td className={cls("day")}>{day}</td>
              ))}
            </tr>
          ))}
        </table>
      </div>
      <Arrows onBack={setPrevMonth} onNext={setNextMonth}>
        <div className={cls("title")}>
          {
            /* {currentMonth}, {year} */
            <>
              <select
                name="months"
                value={currentMonth}
                className={cls("select")}
                onChange={onMonthChange}
              >
                <option value="Январь">Январь</option>
                <option value="Февраль">Февраль</option>
                <option value="Март">Март</option>
                <option value="Апрель">Апрель</option>
                <option value="Май">Май</option>
                <option value="Июнь">Июнь</option>
                <option value="Июль">Июль</option>
                <option value="Август">Август</option>
                <option value="Сентябрь">Сентябрь</option>
                <option value="Октябрь">Октябрь</option>
                <option value="Ноябрь">Ноябрь</option>
                <option value="Декабрь">Декабрь</option>
              </select>
              <input
                type="number"
                min="1970"
                max="2050"
                step="1"
                value={year}
                onChange={onYearChange}
              />
            </>
          }
        </div>
      </Arrows>
    </div>
  );
};