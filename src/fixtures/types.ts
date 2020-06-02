export interface Task {
  id?: string;
  author?: string;
  authorId?: string;
  title: string;
  description: string;
  status?: boolean;
  createdAt?: Date;
}

export interface Auth {
  uid: string;
}

export interface Credentials {
  email: string;
  password: string;
}
