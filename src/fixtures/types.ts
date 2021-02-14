import { ACCOUNT_TYPE } from './constants';

export interface Project {
  id?: string;
  author?: string;
  authorId?: string;
  projectName: string;
  description: string;
  members?: User[];
}

export interface Task {
  id?: string;
  author?: string;
  authorId?: string;
  title: string;
  description: string;
  status?: boolean;
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
}

export interface Auth {
  uid: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
}

export interface NewUser {
  email: string;
  password: string;
  username: string;
  accountType: ACCOUNT_TYPE;
}

export interface Notification {
  id: string;
  content: string;
  user: string;
  authorId: string;
  time: firebase.firestore.Timestamp;
}
