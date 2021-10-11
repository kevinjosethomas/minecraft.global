import { ChangeEventHandler } from "react";

type LongDescriptionProps = {
  value: string;
  setValue: ChangeEventHandler;
};

function LongDescription(props: LongDescriptionProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-2">
      <span className="font-medium text-3xl text-gray-400">
        Long Description (supports{" "}
        <a
          href="https://commonmark.org/help/"
          target="_blank"
          rel="noreferrer"
          className="format-links"
        >
          markdown
        </a>
        )
      </span>
      <div className="flex flex-col items-center justify-center p-4 w-full bg-dark-700 rounded border-2 border-gray-800">
        <textarea
          className="w-full min-h-[25rem] text-gray-400 bg-transparent focus:outline-none rounded resize-none"
          value={props.value}
          onChange={props.setValue}
        />
      </div>
    </div>
  );
}

export default LongDescription;
