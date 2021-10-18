type SoonProps = {
  server: Record<string, any>;
  user: Record<string, any>;
  reload: CallableFunction;
};

function Soon(props: SoonProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center w-full py-20 space-y-6 bg-dark-800 rounded border-2 border-gray-800">
      <img
        src="/images/illustration1.png"
        alt="Steve, Alex and Wolf with Pickaxe and Sword"
        draggable="false"
      />
      <span className="font-bold text-4xl md:text-6xl text-gray-300">Coming Soon</span>
    </div>
  );
}

export default Soon;
