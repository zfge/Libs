import { CheckboxProps } from "../types/Menu.ts";

export default function Checkbox(props: CheckboxProps) {
  return (
    <article
      className={`snow__checkbox ${props.selected ? "selected" : ""} ${
        props.disabled ? "disabled" : ""
      }`}
    >
      <h3
        className="snow__checkbox__title"
        data-subtitle=""
        style={{ fontWeight: 500 }}
      >
        {props.title}
      </h3>
      <div className="snow__checkbox__right-label">
        <input
          type="checkbox"
          id={`cb-${props.title}`}
          checked={props.checked}
          readOnly
          style={{ display: 'none' }}
        />
        <label htmlFor={`cb-${props.title}`}>
          {props.checked ? "✓" : ""}
        </label>
      </div>
    </article>
  );
}
