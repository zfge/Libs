import { IconProps } from "../types/Menu.ts";

export default function Icon(props: IconProps) {
  return (
    <small
      className={`snow__icon ${props.selected ? "selected" : ""}`}
      style={{ transform: `rotate(${props.rotation || 0}deg)` }}
    >
      <img src={`https://cdn-shengun.fr/assets/icons/${props.icon}.webp`} alt="snow-icon" />
    </small>
  );
}
