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
  bedrock: boolean;
  cracked: boolean;
  whitelisted: boolean;
  approved: boolean;
  premium: boolean;
  last_updated: Date;
  created_at: Date;
  offline_since: Date;
  online: boolean;
  favicon: string;
  players_online: number;
  max_players: number;
  pinged_at: Date;
  user?: Record<string, any>;
};

type Dropdown = {
  label: string;
  value: any;
};

type Auction = {
  favicon: string;
  name: string;
  usd_amount: number;
};

type AuctionBid = {
  name: string;
  usd_amount: number;
};

enum AuctionsPacketType {
  INFO = 0, // Load all data for all locations
  NEW_BID = 1, // Sent from client to server
  BIDDER_COUNT = 2, // Sent from server to client
}

export type { Server, Dropdown, Auction, AuctionBid };
export { AuctionsPacketType };
