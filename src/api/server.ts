import axios from "axios";

async function GetServer(id: string) {
  try {
    const server = await axios.get(process.env.NEXT_PUBLIC_API + "/server/" + id);
    return [server.data.payload, null];
  } catch (e) {
    return [null, e];
  }
}

async function GetRandomServer() {
  try {
    const server = await axios.get(process.env.NEXT_PUBLIC_API + "/server/random/id");
    return [server.data.payload, null];
  } catch (e) {
    return [null, e];
  }
}

async function NewServer(data: Record<string, any>, token: string) {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/server/new", data, {
      headers: {
        Authorization: token,
      },
    });
    return [response, null];
  } catch (e) {
    return [null, e];
  }
}

async function GetTopVoters(id: string) {
  try {
    const votes = await axios.get(process.env.NEXT_PUBLIC_API + `/server/${id}/votes/top`);
    return [votes.data.payload, null];
  } catch (e) {
    return [null, e];
  }
}

async function UpvoteServer(id: string, playername: string) {
  try {
    const upvote = await axios.post(process.env.NEXT_PUBLIC_API + `/server/${id}/vote`, {
      server_id: id,
      minecraft_username: playername,
    });
    return [upvote.data.payload, null];
  } catch (e) {
    return [null, e];
  }
}

export { GetServer, GetRandomServer, NewServer, GetTopVoters, UpvoteServer };
