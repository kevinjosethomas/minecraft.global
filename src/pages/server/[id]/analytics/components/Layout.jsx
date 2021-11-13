import Card from "./Card";
import Chart from "./Chart";

export default function Layout(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-4">
      <h3 className="font-medium text-4xl text-white text-opacity-80">{props.title}</h3>
      <div className="flex flex-row items-center items-stretch w-full">
        <div
          className={`grid grid-cols-2 gap-3 w-full ${
            props.index % 2 === 0 ? "mr-3" : "order-2 ml-3"
          }`}
        >
          {props.cards.map((card, index) => (
            <Card key={index} title={card.title} subtitle={card.subtitle} value={card.value} />
          ))}
        </div>
        <Chart
          type={props.type}
          types={props.types}
          setType={props.setType}
          duration={props.duration}
          labels={props.labels}
          setDuration={props.setDuration}
        />
      </div>
    </div>
  );
}
