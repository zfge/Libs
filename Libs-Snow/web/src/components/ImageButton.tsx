import { ImageButtonProps } from "../types/Menu.ts";

export default function ImageButton(props: ImageButtonProps) {
  return (
    <article
      className={`snow__imagebutton 
        ${props.selected ? "selected" : ""} 
        ${props.disabled ? "disabled" : ""}
      `}
      style={{
        backgroundImage: `url(${props.image})`,
      }}
    >
      <h3 className="snow__imagebutton__title">{props.title}</h3>
    </article>
  );
}
