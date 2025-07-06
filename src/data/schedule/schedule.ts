export type Slots = {
  schedules: Schedule[];
};

export type Schedule = {
  day: string;
  rooms: Room[];
};

export type RoomName =
| "Jules Verne"
| "Titan"
| "Belem"
| "Tour Bretagne"
| "Les Machines"
| "Hangar"
| "L'Atelier";

export type Room = {
  room: RoomName
  slots: RoomSlot[];
};

export type RoomSlot = {
  slot: string;
  talk: string;
};
