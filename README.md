# **Widgets made with react and typescript**

## **Calendar**

React component, which draws a calendar for current month. Weekends marked as for CIS countries. Uses [arrows](#arrows) to change months. Also has select with month to change and input to change years.

```tsx
interface CalendarProps {
  date?: Date;
}
```

## **Slider**

Rect component, which draws a scrolable list of images. Has different kinds of scroll handlers:

- Click on edges to swipe to sibling slide;
- Use buttons to swipe to selected slide;
- Use arrows which has same functionality as clicking on edges;

```tsx
interface SliderProps {
  amount: number;
  content: Array<ReactNode>;
  className?: string;
}
```

## **Clock**

Simple mechanical-type clock that shows current time.

```tsx
// date given through Tick component, which creates timeout to rerender arrows
export interface ClockProps {
  size: number;
  date: Date;
}
```

## <a name="arrows"></a>**Arrows**

Exportable component that has two arrows. One to swipe for previous child component and other for next. Can render given content in between.

```tsx
interface ArrowsProps {
  children?: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
}
```
