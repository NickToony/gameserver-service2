export interface ServerResponse {
  id: number;
  name: string;
  current_players: number;
  max_players: number;
  meta: { [key: string]: string };
}

export interface GetServersResponse {
  data: ServerResponse[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}
