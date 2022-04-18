import Tags from "./components/Tags";
import AddServer from "./components/AddServer";

export default function Sidebar(props) {
  return (
    <div className="hidden min-w-[400px] max-w-[400px] flex-col items-start justify-start space-y-8 md:flex">
      {/* {!props.addServer && <AddServer />} */}
      <a
        href="https://api.minecraft.global/a/home/redirect"
        target="_blank"
        rel="noopener"
      >
        <img
          draggable="false"
          alt="Embedded Image"
          src="https://api.minecraft.global/a/home/image"
          className="h-[66px] w-[400px]"
        />
      </a>
      <Tags servers={props.servers} />
    </div>
  );
}
