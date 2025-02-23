export interface ServerResponse {
  id: number;
  name: string;
  currentPlayers: number;
  maxPlayers: number;
  meta: Map<string, string>;
}

export interface GetServersResponse {
  data: ServerResponse[];
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  from: number;
  to: number;
}
