export type FormValues = {
  username: string;
  password: string;
  confirmpassword?: string;
};

export type Todo = {
  title: string;
  description: string;
  status: number;
  authorId: string,
};
