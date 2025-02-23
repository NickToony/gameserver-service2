export interface ServerDto {
  id: number;
  name: string;
  currentPlayers: number;
  maxPlayers: number;
  metadata: { [key: string]: string };
  password: string;
}
