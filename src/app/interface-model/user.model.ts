export interface User {
  uid: string
  email: string;
  displayName?: string;
  photoURL?: string
  nickname?: string
  givenName?: string
  gender?: string
  dateOfBirth?: Date | any
}

