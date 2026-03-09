import { SearchInputProps } from "../types/Menu.ts";

export default function SearchInput(props: SearchInputProps) {
  return (
    <article
      className={`snow__searchinput ${props.selected ? "selected" : ""} ${
        props.disabled ? "disabled" : ""
      }`}
    >
      <input
        type="text"
        className="snow__searchinput__input"
        placeholder="Rechercher..."
        onChange={(e) =>
          props.searchCallback && props.searchCallback(e.target.value)
        }
        style={{
          background: 'transparent',
          border: 'none',
          color: '#fff',
          outline: 'none',
          fontSize: '13px',
          fontWeight: 700,
          flex: 1,
          padding: 0,
          margin: 0,
          width: '100%'
        }}
        value={props.query || ""}
      />
    </article>
  );
}
