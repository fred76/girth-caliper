export interface Photo {
  url?: string;
  viewSide?: string;
  date?: Date | any;
}
export interface PhotoSession {
  front: { urlFront?: string, viewName: "Front" };
  back: { urlBack?: string, viewName: "Back" };
  side: { urlSide?: string, viewName: "Side" };
  date?: Date | any;
}
