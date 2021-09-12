type ContactProps = {
  contact: Record<string, any>;
};

function Contact(props: ContactProps): JSX.Element {
  return (
    <a
      className="flex flex-col items-center justify-center w-32 md:w-48 h-32 md:h-48 space-y-4 bg-dark-700 rounded border-2 border-gray-800 hover:scale-102 transform duration-300"
      href={props.contact.href}
      target="_blank"
      rel="noreferrer"
    >
      <i className={`${props.contact.icon} text-4xl md:text-5xl text-gray-300`} />
    </a>
  );
}

export default Contact;
