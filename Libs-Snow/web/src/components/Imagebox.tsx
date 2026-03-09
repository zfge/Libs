import { ImageboxProps } from "../types/Menu.ts";

export default function Imagebox(props: ImageboxProps) {
  return (
    <article className="snow__imagebox">
      <img className="snow__imagebox__img" src={props.image1} />
      {props.image2 && (
        <img className="snow__imagebox__img" src={props.image2} />
      )}
    </article>
  );
}
