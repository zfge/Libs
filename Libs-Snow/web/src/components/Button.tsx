import { ButtonProps } from "../types/Menu.ts";
import Icon from "./Icon.tsx";

export default function Button(props: ButtonProps) {
  if (props.rightLabel) {
    props.rightLabel =
      typeof props.rightLabel === "string"
        ? props.rightLabel
        : String(props.rightLabel);
  }

  let displayColor = props.rightLabel && props.rightLabel.indexOf("#") === 0;

  return (
    <article
      className={`snow__button ${props.selected ? "selected" : ""} ${
        props.disabled ? "disabled" : ""
      }`}
    >
      <h3
        className="snow__button__title"
        data-subtitle=""
        style={{
          fontWeight: 500,
        }}
      >
        {props.title}
      </h3>
      {props.rightLabel && !displayColor && (
        <span className="snow__button__right-label">{props.rightLabel}</span>
      )}
      {props.rightLabel && displayColor && (
        <span
          className="snow__button__right-label"
          style={{ backgroundColor: props.rightLabel }}
        >
          {props.rightLabel}
        </span>
      )}
      {props.icon && !props.rightLabel && (
        <Icon icon={props.icon} selected={props.selected} />
      )}
    </article>
  );
}
