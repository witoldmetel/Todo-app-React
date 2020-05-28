export interface Task {
  author?: string;
  authorId?: string;
  title: string;
  description: string;
  status?: boolean;
  createdAt?: Date;
  [key: string]: any;
}
