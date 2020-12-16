import {lgScreen, xlScreen, mdScreen, smScreen, xsScreen} from "./variables";

export default function defineWidth() {
  const w = window.innerWidth;

  if (w >= xlScreen) return xlScreen;
  if (w < xlScreen && w >= lgScreen ) return lgScreen;
  if (w < lgScreen && w >= mdScreen ) return mdScreen;
  if (w < mdScreen && w >= smScreen ) return mdScreen;
  if (w < smScreen) return xsScreen;
}