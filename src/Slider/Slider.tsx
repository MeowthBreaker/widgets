import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
  MouseEvent,
} from "react";

import { cn } from "../utils/cn";

import { Arrows } from "../Arrows/Arrows";

import "./Slider.css";

const cls = cn("slider");

interface SliderProps {
  amount: number;
  content: Array<ReactNode>;
  className?: string;
}

export const Slider: FC<SliderProps> = ({ amount, className, content }) => {
  const cards = useMemo<ReactNode[][]>(
    () =>
      content.reduce<ReactNode[][]>((acc, cur) => {
        if (acc.length === 0) acc.push([]);

        if (acc.at(-1)!.length < amount) acc[acc.length - 1].push(cur);
        else acc.push([cur]);

        return acc;
      }, []),
    [content]
  );

  const [activeSlide, setActiveSlide] = useState(0);

  const style = useMemo(
    () => ({ transform: `translate(-${100 * activeSlide}%)` }),
    [activeSlide]
  );

  const back = useCallback(() => {
    activeSlide - 1 < 0
      ? setActiveSlide(cards.length - 1)
      : setActiveSlide(activeSlide - 1);
  }, [cards, activeSlide]);

  const next = useCallback(() => {
    activeSlide + 1 > cards.length - 1
      ? setActiveSlide(0)
      : setActiveSlide(activeSlide + 1);
  }, [cards, activeSlide]);

  useEffect(() => {
    const ChangeSlideOnKeyDown = (event: KeyboardEvent) => {
      if (event.code === "ArrowLeft") back();
      else if (event.code === "ArrowRight") next();
    };

    document.addEventListener("keydown", ChangeSlideOnKeyDown);

    return () => document.removeEventListener("keydown", ChangeSlideOnKeyDown);
  }, [back, next]);

  const ChangeSlideOnClick = useCallback(
    (e: MouseEvent) => {
      if (document.body.clientWidth / 2 > e.clientX) back();
      else next();
    },
    [back, next]
  );

  return (
    <div className={cls(null, [className])}>
      <div
        className={cls("wrapper")}
        style={style}
        onClick={ChangeSlideOnClick}
      >
        {cards.map((card, idx) => (
          <div className={cls("slide")} key={idx}>
            {card.map((item, idx) => (
              <div className={cls("card")} key={idx}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Arrows onBack={back} onNext={next}>
        {cards.map((_, idx) => (
          <div
            className={cls("button", { active: activeSlide === idx })}
            key={idx}
            onClick={() => setActiveSlide(idx)}
          ></div>
        ))}
      </Arrows>
    </div>
  );
};
