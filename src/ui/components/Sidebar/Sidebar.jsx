import Tags from "./components/Tags";
import Premium from "./components/Premium";
import AddServer from "./components/AddServer";

export default function Sidebar(props) {
  return (
    <div className="hidden md:flex flex-col items-start justify-start min-w-[400px] max-w-[400px] space-y-8">
      {/* <div className="flex flex-col items-start justify-start w-full space-y-2"></div> */}
      {!props.addServer && <AddServer />}
      <a href="https://discord.minecraft.global/" target="_blank" rel="noreferrer">
        <img
          src="/images/sidebar-ad.png"
          draggable="false"
          alt="Rent this advertisement spot"
          className="rounded"
        />
      </a>
      {/* <Premium /> */}
      <Tags servers={props.servers} />
    </div>
  );
}
