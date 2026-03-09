import { TitleProps } from "../types/Menu.ts";

export default function Title(props: TitleProps) {
  return (
    <article className="snow__title">
      <h3
        className="snow__title__left-label"
        data-subtitle=""
        style={{ fontWeight: 700 }}
      >
        {props.leftLabel}
      </h3>
      {props.rightLabel && (
        <p
          className="snow__title__right-label"
          data-subtitle=""
          style={{ fontWeight: 400 }}
        >
          {props.rightLabel}
        </p>
      )}
    </article>
  );
}
