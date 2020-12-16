export interface User {
  uid: string
  email: string;
  displayName?: string;
  photoURL?: string
}

export interface UserExtended extends User {
  gender: string
  dateOfBirth: Date
}
