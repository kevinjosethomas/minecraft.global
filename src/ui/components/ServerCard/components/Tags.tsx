import SimplifyNumber from "simplify-number";

import Tag from "./Tag";

type TagsProps = {
  monthly_votes: number;
  players_online: number;
  tags: string[];
};

function Tags(props: TagsProps): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-start w-full space-x-2 overflow-x-scroll no-scrollbar hover:cursor-grab">
      <Tag
        icon="far fa-arrow-alt-up"
        tag={SimplifyNumber(props.monthly_votes, { decimal: 1 }).toUpperCase()}
      />
      <Tag
        icon="far fa-user"
        tag={SimplifyNumber(props.players_online, { decimal: 1 }).toUpperCase()}
      />
      {props.tags.map((tag: string) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
}

export default Tags;
