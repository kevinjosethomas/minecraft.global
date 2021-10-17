import Head from "next/head";

type Default = {
  title: string;
  metatitle: string;
  author: string;
  uuid: string;
  date: string;
  children?: React.ReactNode;
};

const Default = (props: Default): JSX.Element => {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <Head>
        <title>{props.metatitle}</title>
        <meta name="title" content={props.metatitle} />
        <meta property="og:title" content={props.metatitle} />
        <meta property="twitter:title" content={props.metatitle} />
      </Head>
      <div className="flex flex-col items-start justify-start space-y-8">
        <div className="flex flex-col items-start justify-start space-y-2">
          <h1 className="font-bold text-6xl text-gray-300">{props.title}</h1>
          <div className="flex flex-row items-center justify-start px-6 py-4 space-x-2 bg-dark-800 rounded-lg">
            <img
              src={`https://crafatar.com/avatars/${props.uuid}?size=64`}
              alt={`${props.author} skin head`}
              className="rounded-full"
              draggable="false"
            />
            <div className="flex flex-col items-start justify-start">
              <span className="font-medium text-2xl text-gray-400">By {props.author}</span>
              <span className="text-gray-400">On {props.date}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start space-y-8 blog-content format-links">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Default;
