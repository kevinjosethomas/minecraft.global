type Server = {
  server_id: number;
  host: string;
  port: number;
  name: string;
  vanity: string;
  owner_id: number;
  monthly_votes: number;
  description: string;
  long_description: string;
  website_url: string;
  discord_url: string;
  trailer_url: string;
  tags: string[];
  is_bedrock: boolean;
  is_cracked: boolean;
  whitelisted: boolean;
  approved: boolean;
  premium: boolean;
  last_updated: Date;
  created_at: Date;
  offline_since: Date;
  online: boolean;
  favicon: string;
  players_online: number;
  player_data: object[];
  pinged_at: Date;
};

type Auction = {
  favicon: string;
  name: string;
  usd_amount: number;
};

enum AuctionsPacketType {
  INFO = 0, // Load all data for all locations
  NEW_BID = 1, // Sent from client to server
  BIDDER_COUNT = 2, // Sent from server to client
}

export type { Server, Auction };
export { AuctionsPacketType };
