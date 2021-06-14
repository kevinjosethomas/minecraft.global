import axios from "axios";

async function upvoteServer(id, player) {
  const { data } = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `/server/${id}/vote`,
    {
      server_id: id,
      minecraft_username: player,
    }
  );

  return data;
}

export default upvoteServer;
