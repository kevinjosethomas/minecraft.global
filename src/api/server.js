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
  GetServerAnalytics,
  GetServerTopVoters,
  GetRandomServerID,
  GetServerTransactions,
  GetServers,
  RegenToken,
  NewServer,
  ReportServer,
  EditServer,
  DeleteServer,
};
