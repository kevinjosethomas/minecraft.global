import axios from "axios";

// const GetUsernameFromUUID = async (uuid) => {
//   try {
//     const response = await axios.get(
//       `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`
//     );

//     return [response.data, null];
//   } catch (e) {
//     return [null, e];
//   }
// };

const GenerateLinkCode = async (token) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mc/link/generate`, {
      headers: {
        Authorization: token,
      },
    });

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export { GenerateLinkCode };
