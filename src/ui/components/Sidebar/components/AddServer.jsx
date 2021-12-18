import Link from "next/link";

export default function AddServer() {
  return (
    <Link href="/server/add">
      <a className="flex flex-row items-center justify-start w-full px-4 py-2 space-x-3 hover:bg-white hover:bg-opacity-5 rounded transition duration-300">
        <i className="fad fa-plus-circle w-[37.5px] text-center text-3xl text-olive-600" />
        <p className="text-3xl text-white text-opacity-80">Add Your Server</p>
      </a>
    </Link>
  );
}
