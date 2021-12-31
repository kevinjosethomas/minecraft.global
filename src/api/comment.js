const FetchServerComments = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/server/${id}/comments`);

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const PostServerComment = async (id, content, token) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${id}/comment`,
      {
        content: content,
      },
      { headers: { Authorization: token } }
    );

    return [response.data, null];
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

return { FetchServerComments, PostServerComment, EditServerComment };
