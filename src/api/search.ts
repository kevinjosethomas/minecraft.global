import axios from "axios";
import qs from "querystring";

async function SearchServers(parameters: Record<string, any>) {
  try {
    const servers = await axios.get(
      process.env.NEXT_PUBLIC_API + `/search?${qs.stringify(parameters)}`
    );
    return [servers.data.payload, null];
  } catch (e) {
    return [null, e];
  }
}

export default SearchServers;
