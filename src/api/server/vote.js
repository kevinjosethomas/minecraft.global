import axios from "axios";

async function upvoteServer(id, player) {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/server/${id}/vote`, {
      server_id: id,
      minecraft_username: player,
    });
    return [response, null];
  } catch (e) {
    return [null, e];
  }
}

export default upvoteServer;
