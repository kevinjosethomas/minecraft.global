function Header(): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-center p-4 bg-dark-900 rounded-t">
      <span className="w-14 font-bold text-3xl text-gray-300">#</span>
      <span className="w-96 font-bold text-3xl text-gray-300">Server</span>
      <span className="w-60 font-bold text-3xl text-gray-300">Amount</span>
    </div>
  );
}

export default Header;
