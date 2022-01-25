import axios from "axios";
import fernet from "fernet";

const EVENTS = {
  "COPY-IP": 1,
};

const token = new fernet.Token({
  secret: new fernet.Secret(process.env.NEXT_PUBLIC_EVENT_TOKEN),
});

const PostEvent = async (type, data) => {
  try {
    const auth = token.encode(
      `${Date.now()}|+2&>HAa;5),6|${Math.round(Math.random() * 1000)}`
    );

    const payload = {
      ...data,
      type: EVENTS[type],
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/site/event`,
      payload,
      {
        headers: {
          Authorization: auth,
        },
      }
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export { PostEvent };
