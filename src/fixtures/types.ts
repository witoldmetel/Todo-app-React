import { ACCOUNT_TYPE } from './constants';

export interface Project {
  id?: string;
  author?: string;
  authorId?: string;
  projectName: string;
  description: string;
  tasks: Task[];
}

export interface Task {
  id?: string;
  author?: string;
  authorId?: string;
  title: string;
  description: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Auth {
  uid: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface NewUser {
  email: string;
  password: string;
  username: string;
  accountType: ACCOUNT_TYPE;
}
