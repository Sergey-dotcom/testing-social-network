export interface UsersEducation {
  type: string;
  title: string;
  specialization: string;
  start: string;
  end: string;
}

export interface User {
  id?: string;
  login?: string;
  password?: string;
  role?: "admin" | "user";
  status?: "online" | "offline";
  avatar?: string;
  birthday?: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  country?: string;
  about?: string;
  educations?: UsersEducation[];
}