import axios from "axios";

const GetServerByID = async (id) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/server/${id}`);

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

const GetServerAnalytics = async (id) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/server/${id}/stats`);

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

export {
  GetServerByID,
  GetServerCommentsByID,
  GetServerAnalytics,
  GetServerTopVoters,
  PostComment,
  EditServerComment,
  ReportServer,
};
