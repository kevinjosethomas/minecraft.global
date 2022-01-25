import axios from "axios";

const FetchServer = async (identifier, token) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/server/${identifier}`,
      {
        headers: {
          Authorization: token || "",
        },
      }
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const FetchServerAnalytics = async (id, token) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/server/${id}/stats`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const FetchRandomServerID = async () => {
  try {
    const response = await axios.get(`${process.env.API_URL}/server/random/id`);

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const FetchServers = async () => {
  try {
    const response = await axios.get(`${process.env.API_URL}/servers`);

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const FetchServerTransactions = async (server_id, token) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/server/${server_id}/transactions`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const NewServer = async (data, token) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/server/new`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );

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
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${id}/edit`,
      data,
      {
        headers: { Authorization: token },
      }
    );

    return [response, null];
  } catch (e) {
    return [null, e];
  }
};

const DeleteServer = async (id, token) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${id}`,
      {
        headers: { Authorization: token },
      }
    );

    return [response, null];
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

export {
  FetchServer,
  FetchRandomServerID,
  FetchServerAnalytics,
  FetchServerTransactions,
  FetchServers,
  NewServer,
  ReportServer,
  EditServer,
  DeleteServer,
  RegenToken,
};
