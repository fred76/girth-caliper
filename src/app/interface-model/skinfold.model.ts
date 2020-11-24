
export interface SkinfoldsTile {
  title?: string;
  image?: string;
  text?: string;
  value1?: number;
  value2?: number;
  value3?: number;
  date?: Date | any;
  method?: string
}

export interface SkinfoldsForDB {
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
  };
  bodyResult: {
    bodyDensity: number,
    bodyFatPercentage: number,
    fatMass: number,
    leanMass: number,
    skinfoldsSum: number
  }
}
export class SkinfoldsForDB implements SkinfoldsForDB {
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
  };
  bodyResult: {
    bodyDensity: number,
    bodyFatPercentage: number,
    fatMass: number,
    leanMass: number,
    skinfoldsSum: number
  }
}
