type NavigationProps = {
  page: number;
  setPage: CallableFunction;
  records: number;
  total_records: number;
};

function Navigation(props: NavigationProps): JSX.Element {
  const lastPage = Math.ceil(props.total_records / 12);

  return (
    <div className="flex flex-row items-center justify-center self-end space-x-4">
      {props.page !== 1 && (
        <i
          className="far fa-chevron-left text-lg text-gray-400 hover:text-gray-300 cursor-pointer select-none transition duration-300"
          onClick={() => props.setPage(props.page - 1)}
        />
      )}

      <div className="flex flex-col items-center justify-center px-4 py-1 bg-olive-800 rounded select-none">
        <span className="text-lg text-gray-300">Page {props.page}</span>
      </div>
      {props.page !== lastPage && (
        <i
          className="far fa-chevron-right text-lg text-gray-400 hover:text-gray-300 cursor-pointer select-none transition duration-300"
          onClick={() => props.setPage(props.page + 1)}
        />
      )}
    </div>
  );
}

export default Navigation;
