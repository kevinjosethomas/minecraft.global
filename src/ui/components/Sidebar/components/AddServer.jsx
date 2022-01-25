import Link from "next/link";

export default function AddServer() {
  return (
    <Link href="/server/add">
      <a className="flex w-full flex-row items-center justify-start space-x-3 rounded px-4 py-2 transition duration-300 hover:bg-white hover:bg-opacity-5">
        <i className="fad fa-plus-circle w-[37.5px] text-center text-3xl text-olive-600" />
        <p className="text-3xl text-white text-opacity-80">Add Your Server</p>
      </a>
    </Link>
  );
}
