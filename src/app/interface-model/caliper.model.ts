
export interface CaliperTile {
  title?: string;
  image?: string;
  text?: string;
  value1?: number;
  value2?: number;
  value3?: number;
  date?: Date | any;
  method?: string
}






export interface CaliperForDB {
  fold: {
    Chest?: number,
    Subscapular?: number,
    Midaxillary?: number,
    Triceps?: number,
    Suprailiac?: number,
    Abdominal?: number,
    Thigh?: number,
    Bicep?: number,
  };
  metadata: {
    method: string
    date?: Date | any;
    weight: number
    age: number
  }
}
export class CaliperForDB implements CaliperForDB {
  fold: {
    Chest?: number,
    Subscapular?: number,
    Midaxillary?: number,
    Triceps?: number,
    Suprailiac?: number,
    Abdominal?: number,
    Thigh?: number,
    Bicep?: number,
  };
  metadata: {
    method: string
    date?: Date | any;
    weight: number
    age: number
  }
}
