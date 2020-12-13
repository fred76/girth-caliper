export interface User {
  uid: string
  email: string;
  displayName?: string;
  photoURL: string
}

export interface userExtended extends User {
  gender: string
  dateOfBirth: Date
}
