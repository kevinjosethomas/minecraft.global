const validate = {
  name: (params: any) => {
    if (!params.name) {
      return "You must provide a server name!";
    }
    if (params.name.length < 3) {
      return "Your server name must be atleast 3 characters in length!";
    }
    if (params.name.length > 32) {
      return "Your server name must not be more than 32 characters in length!";
    }
    return true;
  },
  host: (params: any) => {
    if (!params.host) {
      return "You must provide a server host!";
    }
    if (params.host.length < 3) {
      return "Your server host must be atleast 3 characters in length!";
    }
    if (params.host.length > 258) {
      return "Your server host must not be more than 258 characters in length!";
    }
    return true;
  },
  port: (params: any) => {
    const parsedPort = parseInt(params.port);

    if (params.port !== null && (isNaN(parsedPort) || parsedPort < 0 || parsedPort > 65535)) {
      return "The provided port in the server address is invalid!";
    }
    return true;
  },
  description: (params: any) => {
    if (!params.description) {
      return "You must provide a server description!";
    }
    if (params.description.length < 15) {
      return "Your server description must be atleast 15 characters in length!";
    }
    if (params.description.length > 150) {
      return "Your server description must not be more than 150 characters in length!";
    }
    return true;
  },
  tags: (params: any) => {
    if (!params.tags) {
      return "You must provide server tags!";
    }
    if (params.tags.length < 2) {
      return "You must provide atleast 2 tags!";
    }
    if (params.tags.length > 8) {
      return "You must not provide more than 8 tags!";
    }
    return true;
  },
  whitelisted: (params: any) => {
    if (
      params.whitelisted === null ||
      (params.whitelisted !== true && params.whitelisted !== false)
    ) {
      return "Invalid input for whitelisted!";
    }
    return true;
  },
  bedrock: (params: any) => {
    if (params.bedrock === null || (params.bedrock !== true && params.bedrock !== false)) {
      return "Invalid input for bedrock!";
    }
    return true;
  },
  cracked: (params: any) => {
    if (params.cracked === null || (params.cracked !== true && params.cracked !== false)) {
      return "Invalid input for cracked!";
    }
    return true;
  },
  website_url: (params: any) => {
    if (!params.website_url) {
      return true;
    }
    if (params.website_url.length < 10) {
      return "Your server website url must be at least 10 characters in length!";
    }
    if (params.website_url.length > 220) {
      return "Your server website url must not be more than 220 characters in length!";
    }
    return true;
  },
  discord_url: (params: any) => {
    if (!params.discord_url) {
      return true;
    }
    if (params.discord_url.length < 10) {
      return "Your server discord url must be atleast 10 characters in length!";
    }
    if (params.discord_url.length > 32) {
      return "Your server discord url must not be more than 32 characters in length!";
    }
    return true;
  },
  trailer_url: (params: any) => {
    if (!params.trailer_url) {
      return true;
    }
    if (params.trailer_url.length < 10) {
      return "Your server trailer url must be atleast 10 characters in length!";
    }
    if (params.trailer_url.length > 220) {
      return "Your server trailer url must not be more than 220 characters in length!";
    }
    return true;
  },
  long_description: (params: any) => {
    if (!params.long_description) {
      return "You must provide a long description!";
    }
    if (params.long_description.length < 75) {
      return "Your server's long description must be atleast 75 characters in length!";
    }
    if (params.long_description.length > 5000) {
      return "Your server's long description must not be more than 5000 characters in length!";
    }
    return true;
  },
  votifier_host: (params: any) => {
    if (!params.votifier_host) {
      return true;
    }
    if (params.votifier_host.length < 3) {
      return "Your votifier host must be atleast 3 characters in length!";
    }
    if (params.votifier_host.length > 258) {
      return "Your votifier host must not be more than 258 characters in length!";
    }
    return true;
  },
  votifier_port: (params: any) => {
    if (!params.votifier_port) {
      return true;
    }
    if (
      !params.votifier_port ||
      isNaN(parseInt(params.votifier_port)) ||
      parseInt(params.votifier_port) < 0 ||
      parseInt(params.votifier_port) > 65535
    ) {
      return "You must provide a valid votifier port!";
    }
    return true;
  },
  votifier_token: (params: any) => {
    if (!params.votifier_token) {
      return true;
    }
    if (params.votifier_token.length < 15) {
      return "Your votifier token must be atleast 15 characters in length!";
    }
    if (params.votifier_token.length > 1000) {
      return "Your votifier token must not be more than 1000 characters in length!";
    }
    return true;
  },
};

export default validate;
