import Tags from "./components/Tags";
import Premium from "./components/Premium";
import AddServer from "./components/AddServer";

export default function Sidebar(props) {
  return (
    <div className="hidden min-w-[400px] max-w-[400px] flex-col items-start justify-start space-y-8 md:flex">
      {/* <div className="flex flex-col items-start justify-start w-full space-y-2"></div> */}
      {!props.addServer && <AddServer />}
      {/* <div className="flex flex-col items-start justify-start space-y-2 rounded-lg border-2 border-olive-960 bg-olive-940 bg-opacity-30 p-2">
        <a href="https://semivanilla.com/" target="_blank" rel="noopener">
          <img
            src="/images/semivanilla.png"
            draggable="false"
            alt="Semi Vanilla MC 1.18.1 Survival Join Now"
            className="rounded"
          />
        </a>
        <a
          href="https://discord.minecraft.global/"
          target="_blank"
          rel="noopener"
        >
          <img
            src="/images/sidebar-ad.png"
            draggable="false"
            alt="Rent this advertisement spot"
            className="rounded"
          />
        </a>
      </div> */}
      {/* <Premium /> */}
      <Tags servers={props.servers} />
    </div>
  );
}
