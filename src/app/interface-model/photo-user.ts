export interface PhotoSession {
  front: { urlFront?: string, viewName: "Front" };
  back: { urlBack?: string, viewName: "Back" };
  side: { urlSide?: string, viewName: "Side" };
  date?: Date | any;
}
