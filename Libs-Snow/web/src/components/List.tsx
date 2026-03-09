import { ListProps } from "../types/Menu.ts";

export default function List(props: ListProps) {
  return (
    <article
      className={`snow__list ${props.selected ? "selected" : ""} ${
        props.disabled ? "disabled" : ""
      }`}
    >
      <h3
        className="snow__list__title"
        data-subtitle={props.subtitle}
        style={{ fontWeight: 500 }}
      >
        {props.title}
      </h3>
      {props.items && (
        <div className="snow__list__right-label">
          <div>
            <span className="snow__list__arrow">‹</span>
            <span>{props.items[props.index]}</span>
            <span className="snow__list__arrow">›</span>
          </div>
        </div>
      )}
    </article>
  );
}
