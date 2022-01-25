import { useState } from "react";

import Input from "../components/Input";

export default function Webhooks(props) {
  const [username, setUsername] = useState("");

  function onValueChange(key, value, max) {
    let formatted = max ? value.substring(0, max) : value;

    props.setDetails((d) => ({ ...d, [key]: formatted }));
  }

  return (
    <div className="flex w-full flex-col items-start justify-start space-y-10">
      <div className="flex w-full flex-col items-start justify-start space-y-8">
        <p className="max-w-lg text-lg text-white text-opacity-80">
          Discord Webhooks are a feature that broadcasts messages to a Discord
          channel when someone votes for your server! Use variables{" "}
          <code>{"{username}"}</code>
          and <code>{"{total_votes}"}</code> to customize the message with
          dynamic data!
        </p>
        <Input
          label="Webhook URL"
          description="Your Discord Channel's Webhook URL"
          value={props.details.dsc_webhook_url}
          onChange={(e) =>
            onValueChange("dsc_webhook_url", e.target.value, 1000)
          }
        />
        <Input
          label="Webhook Message"
          description="Your custom Webhooks message"
          value={props.details.dsc_webhook_msg}
          onChange={(e) =>
            onValueChange("dsc_webhook_msg", e.target.value, 100)
          }
        />
      </div>
    </div>
  );
}
