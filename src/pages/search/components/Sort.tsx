type SortProps = {};

function Sort(props: SortProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center">
      <span className="font-bold text-4xl text-gray-400">Sort</span>
      <div className="flex flex-col items-start justify-center space-y-2">
        <div className="flex flex-row items-center justify-center space-x-2">
          <div className="w-6 h-6 bg-dark-200 rounded-full" />
          <span className="font-medium text-2xl text-gray-400">Popularity</span>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2">
          <div className="w-6 h-6 bg-dark-200 rounded-full" />
          <span className="font-medium text-2xl text-gray-400">Growth</span>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2">
          <div className="w-6 h-6 bg-dark-200 rounded-full" />
          <span className="font-medium text-2xl text-gray-400">Upvotes</span>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2">
          <div className="w-6 h-6 bg-dark-200 rounded-full" />
          <span className="font-medium text-2xl text-gray-400">Players</span>
        </div>
      </div>
    </div>
  );
}

export default Sort;
