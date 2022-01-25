import Card from "./Card";
import Chart from "./Chart";

export default function Layout(props) {
  return (
    <div className="flex w-full flex-col items-start justify-start space-y-4">
      <h3 className="text-4xl font-medium text-white text-opacity-80">
        {props.title}
      </h3>
      <div className="flex w-full flex-row items-center items-stretch">
        <div
          className={`grid w-full grid-cols-2 gap-3 ${
            props.index % 2 === 0 ? "mr-3" : "order-2 ml-3"
          }`}
        >
          {props.cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              value={card.value}
            />
          ))}
        </div>
        <Chart
          type={props.type}
          types={props.types}
          setType={props.setType}
          duration={props.duration}
          labels={props.labels}
          setDuration={props.setDuration}
          Ycallback={props.Ycallback}
        />
      </div>
    </div>
  );
}
