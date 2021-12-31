import axios from "axios";

async function UpvoteServer(server_id, username, captcha) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${server_id}/vote`,
      {
        minecraft_username: username,
        captcha_response: captcha,
      }
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
}

const FetchServerTopVoters = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/server/${id}/votes/top`);

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

async function FetchTimeTillUpvote(server_id, username) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${server_id}/vote/time`,
      {
        minecraft_username: username,
      }
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
}

async function TestUpvoteServer(server_id, username, token) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${server_id}/vote/test`,
      { minecraft_username: username },
      { headers: { Authorization: token } }
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
}

export { UpvoteServer, FetchServerTopVoters, FetchTimeTillUpvote, TestUpvoteServer };
