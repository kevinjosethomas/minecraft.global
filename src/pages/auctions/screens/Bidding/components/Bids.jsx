import PageDropdown from "./PageDropdown";

export default function Bids(props) {
  return (
    <div className="flex flex-col items-start justify-start min-w-[800px] p-5 space-y-2 bg-olive-950 border-2 border-olive-930 rounded-lg">
      <PageDropdown pages={props.pages} page={props.page} setPage={props.setPage} />
    </div>
  );
}
