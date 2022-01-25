import PageDropdown from "./PageDropdown";

export default function Bids(props) {
  return (
    <div className="flex min-w-[800px] flex-col items-start justify-start space-y-2 rounded-lg border-2 border-olive-930 bg-olive-950 p-5">
      <PageDropdown
        pages={props.pages}
        page={props.page}
        setPage={props.setPage}
      />
    </div>
  );
}
