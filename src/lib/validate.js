const validate = {
  name: (v) => {
    if (!v) {
      return "Server name is a required field";
    }

    if (v.length < 3) {
      return "Server name must be atleast 3 characters";
    } else if (v.length > 32) {
      return "Server name must be under 32 characters";
    }

    return true;
  },
  host: (v) => {
    if (!v) {
      return "Server address is a required field";
    }

    if (v.length < 3) {
      return "Server address must be atleast 3 characters";
    } else if (v.length > 258) {
      return "Server address must be under 258 characters";
    }

    return true;
  },
  description: (v) => {
    if (!v) {
      return "Server description is a required field";
    }

    if (v.length < 15) {
      return "Server description must be atleast 15 characters";
    } else if (v.length > 258) {
      return "Server description must be under 150 characters";
    }

    return true;
  },
  tags: (v) => {
    if (!v) {
      return "You must provide server tags!";
    }

    if (v.length < 2) {
      return "You must provide atleast 2 tags";
    } else if (v.length > 5) {
      return "You must not provide more than 5 tags";
    }

    return true;
  },
  whitelisted: (v) => {
    if (v === null || (v !== true && v !== false)) {
      return "Invalid input for whitelisted";
    }

    return true;
  },
  bedrock: (v) => {
    if (v === null || (v !== true && v !== false)) {
      return "Invalid input for bedrock edition";
    }

    return true;
  },
  cracked: (v) => {
    if (v === null || (v !== true && v !== false)) {
      return "Invalid input for cracked";
    }

    return true;
  },
  website_url: (v) => {
    if (!v) {
      return true;
    }

    if (!(v.startsWith("http://") || v.startsWith("https://"))) {
      return "Server website URL must start with http:// or https://";
    }

    if (v.length < 3) {
      return "Server website URL must be atleast 3 characters";
    } else if (v.length > 258) {
      return "Server website URL must be under 258 characters";
    }

    return true;
  },
  discord_url: (v) => {
    if (!v) {
      return true;
    }

    if (!(v.startsWith("http://") || v.startsWith("https://"))) {
      return "Server Discord URL must start with http:// or https://";
    }

    if (v.length < 3) {
      return "Server Discord URL must be atleast 3 characters";
    } else if (v.length > 258) {
      return "Server Discord must be under 258 characters";
    }

    return true;
  },
  trailer_url: (v) => {
    if (!v) {
      return true;
    }

    if (!(v.startsWith("http://") || v.startsWith("https://"))) {
      return "Server trailer URL must start with http:// or https://";
    }

    if (v.length < 3) {
      return "Server trailer URL must be atleast 3 characters";
    } else if (v.length > 258) {
      return "Server trailer must be under 258 characters";
    }

    return true;
  },
  long_description: (v) => {
    if (!v) {
      return "Server long description is a required field";
    }

    if (v.length < 75) {
      return "Server long description must be atleast 75 characters";
    } else if (v.length > 5000) {
      return "Server description must be under 5000 characters";
    }

    return true;
  },
  long_description: (v) => {
    if (!v) {
      return "Server long description is a required field";
    }

    if (v.length < 75) {
      return "Server long description must be atleast 75 characters";
    } else if (v.length > 5000) {
      return "Server description must be under 5000 characters";
    }

    return true;
  },
  dsc_webhook_url: (v) => {
    if (!v) {
      return true;
    }

    if (!(v.startsWith("http://") || v.startsWith("https://"))) {
      return "Server Discord webhook URL must start with http:// or https://";
    }

    if (v.length < 3) {
      return "Server Discord webhook URL must be atleast 3 characters";
    } else if (v.length > 1000) {
      return "Server Discord webhook URL must be under 1000 characters";
    }

    return true;
  },
  dsc_webhook_msg: (v) => {
    if (!v) {
      return true;
    }

    if (v.length < 3) {
      return "Server Discord webhook message must be atleast 3 characters";
    } else if (v.length > 100) {
      return "Server Discord webhook message must be under 100 characters";
    }

    return true;
  },
  votifier_host: (v) => {
    if (!v) {
      return true;
    }

    if (v.length < 3) {
      return "Server Votifier host must be atleast 3 characters";
    } else if (v.length > 258) {
      return "Server Votifier host must be under 258 characters";
    }

    return true;
  },
  votifier_host: (v) => {
    if (!v) {
      return true;
    }

    const parsed = parseInt(v);

    if (isNaN(parsed) || parsed < 0 || parsed > 65535) {
      return "Invalid input for Votifier port";
    }

    return true;
  },
  votifier_token: (v) => {
    if (!v) {
      return true;
    }

    if (v.length < 15) {
      return "Server Votifier token must be atleast 15 characters";
    } else if (v.length > 1000) {
      return "Server Votifier token must be under 1000 characters";
    }

    return true;
  },
};

export default validate;
