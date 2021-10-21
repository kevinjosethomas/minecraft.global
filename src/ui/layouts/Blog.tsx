import Head from "next/head";

type Default = {
  header: string;
  title: string;
  metatitle: string;
  author: string;
  uuid: string;
  date: string;
  description: string;
  keywords: string;
  children?: React.ReactNode;
};

const Default = (props: Default): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-start w-full">
      <Head>
        <title>{props.metatitle}</title>
        <meta name="title" content={props.metatitle} />
        <meta name="description" content={props.description} />
        <meta
          name="keywords"
          content={`minecraft, minecraft servers, minecraft server list, cracked minecraft, bedrock minecraft servers, ${props.keywords}`}
        />

        <meta property="twitter:title" content={props.metatitle} />
        <meta name="twitter:description" content={props.description} />

        <meta property="og:title" content={props.metatitle} />
        <meta name="og:description" content={props.description} />
      </Head>
      <div className="flex flex-col items-start justify-start max-w-5xl space-y-8">
        <div className="flex flex-col items-start justify-start space-y-2">
          <h1 className="font-bold text-6xl text-gray-300 leading-tight">{props.header}</h1>
          {/* <div className="flex flex-row items-center justify-start px-6 py-4 space-x-2 bg-dark-800 rounded-lg">
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
          </div> */}
        </div>
        <div className="flex flex-col items-start justify-start space-y-8 blog-content format-links">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Default;
