import axios from "axios";
import Cookies from "cookies";
import { GetServerSidePropsContext } from "next";

async function GetServer(id: string) {
  try {
    const server = await axios.get(process.env.LOCAL_API + "/server/" + id);
    return [server.data.payload, null];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
}
async function GetEditServer(ctx: GetServerSidePropsContext, id: string) {
  try {
    const cookies = new Cookies(ctx.req, ctx.res);
    const token = cookies.get("token");

    const server = await axios.get(process.env.LOCAL_API + "/server/" + id, {
      headers: {
        Authorization: token,
      },
    });
    return [server.data.payload, null];
  } catch (e) {
    return [null, e];
  }
}

async function GetRandomServer() {
  try {
    const server = await axios.get(process.env.LOCAL_API + "/server/random/id");
    return [server.data.payload, null];
  } catch (e) {
    return [null, e];
  }
}

async function GetTopVoters(id: string) {
  try {
    const votes = await axios.get(process.env.LOCAL_API + `/server/${id}/votes/top`);
    return [votes.data.payload, null];
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

async function EditServer(id: string, data: Record<string, any>, token: string) {
  try {
    const response = await axios.put(process.env.NEXT_PUBLIC_API + `/server/${id}/edit`, data, {
      headers: {
        Authorization: token,
      },
    });
    return [response, null];
  } catch (e) {
    return [null, e];
  }
}

async function UpvoteServer(id: string, playername: string, code: string) {
  try {
    const upvote = await axios.post(process.env.NEXT_PUBLIC_API + `/server/${id}/vote`, {
      minecraft_username: playername,
      captcha_response: code,
    });
    return [upvote.data.payload, null];
  } catch (e) {
    return [null, e];
  }
}

async function DeleteServer(id: string, token: string) {
  try {
    const response = await axios.delete(process.env.NEXT_PUBLIC_API + `/server/${id}/delete`, {
      headers: {
        Authorization: token,
      },
    });
    return [response, null];
  } catch (e) {
    return [null, e];
  }
}

export {
  GetServer,
  GetEditServer,
  GetRandomServer,
  GetTopVoters,
  NewServer,
  EditServer,
  UpvoteServer,
  DeleteServer,
};
