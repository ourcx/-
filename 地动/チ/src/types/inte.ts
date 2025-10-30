export interface Track {
  id: number;
  name: string;
  title?: string;
  artist?: string;
  src: string;
  duration: string;
  durationInSeconds?: number;
}

export interface P {
  cur: Track;
}