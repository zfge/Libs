import { TextboxProps } from "../types/Menu.ts";

export default function Textbox(props: TextboxProps) {
  return (
    <article className="snow__textbox">
      {props.title && <h1 className="snow__textbox__title">{props.title}</h1>}
      <p className="snow__textbox__content">{props.content}</p>
    </article>
  );
}
