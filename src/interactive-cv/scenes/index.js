import Journey from "./Journey";
import MarketStall from "./MarketStall";
import PressOffice from "./PressOffice";
import Studio from "./Studio";
import TreePin from "./TreePin";

export { default as Avatar } from "./Avatar";

// Scene component for each chapter number. Chapters without one show the placeholder.
export const scenes = {
  1: Journey,
  2: MarketStall,
  3: PressOffice,
  4: Studio,
  5: TreePin,
};
