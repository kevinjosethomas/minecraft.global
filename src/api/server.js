import axios from "axios";

const GetServerByID = async (id) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/server/${id}`);

    return [response.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

const GetEditServerByID = async (id, token) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/server/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    return [response.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

const GetServerCommentsByID = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/server/${id}/comments`);

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const GetServerAnalytics = async (id, token) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/server/${id}/stats`, {
      headers: {
        Authorization: token,
      },
    });

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const GetServerTopVoters = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/server/${id}/votes/top`);

    return [response.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

const GetRandomServerID = async () => {
  try {
    const response = await axios.get(`${process.env.API_URL}/server/random/id`);

    return [response.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

const GetServers = async () => {
  try {
    const response = await axios.get(`${process.env.API_URL}/servers`);

    return [response.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

const GetServerTransactions = async (server_id, token) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/server/${server_id}/transactions`, {
      headers: {
        Authorization: token,
      },
    });

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const RegenToken = async (id, token) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${id}/regentoken`,
      {},
      {
        headers: { Authorization: token },
      }
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const NewServer = async (data, token) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/server/new`, data, {
      headers: {
        Authorization: token,
      },
    });

    return [response, null];
  } catch (e) {
    return [null, e];
  }
};

const PostComment = async (id, content, token) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${id}/comment`,
      {
        content: content,
      },
      { headers: { Authorization: token } }
    );

    return [response.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

const EditServerComment = async (comment_id, server_id, content, token) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${server_id}/comment/${comment_id}/edit`,
      { content: content },
      { headers: { Authorization: token } }
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const ReportServer = async (id, parameters, token) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${id}/report`,
      parameters,
      {
        headers: { Authorization: token },
      }
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

async function UpvoteServer(server_id, username, captcha) {
  try {
    const upvote = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/server/${server_id}/vote`, {
      minecraft_username: username,
      captcha_response: captcha,
    });

    return [upvote.data.payload, null];
  } catch (e) {
    return [null, e];
  }
}

async function GetTimeUntilUpvote(server_id, username) {
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

const EditServer = async (id, data, token) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/server/${id}/edit`, data, {
      headers: { Authorization: token },
    });

    return [response, null];
  } catch (e) {
    return [null, e];
  }
};

const DeleteServer = async (id, token) => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/server/${id}`, {
      headers: { Authorization: token },
    });

    return [response, null];
  } catch (e) {
    return [null, e];
  }
};

export {
  GetServerByID,
  GetEditServerByID,
  GetServerCommentsByID,
  GetServerAnalytics,
  GetServerTopVoters,
  GetRandomServerID,
  GetServerTransactions,
  GetServers,
  RegenToken,
  NewServer,
  PostComment,
  EditServerComment,
  ReportServer,
  UpvoteServer,
  GetTimeUntilUpvote,
  TestUpvoteServer,
  EditServer,
  DeleteServer,
};
