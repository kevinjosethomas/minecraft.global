import axios from "axios";

const GetUsernameFromUUID = async (uuid) => {
  try {
    const response = await axios.get(
      `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export { GetUsernameFromUUID };
