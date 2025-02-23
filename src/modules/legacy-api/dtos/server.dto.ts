export interface ServerDto {
  id: number;
  name: string;
  currentPlayers: number;
  maxPlayers: number;
  metadata: Map<string, string>;
  password: string;
}
