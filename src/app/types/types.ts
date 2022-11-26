interface Group {
  _id: string
  groupName: string;
}

export interface Me {
  _id: string;
  firstName: string;
  lastName: string;
  aboutMe: string;
  address: string;
  phoneNumber: string;
  gradeId: Grade[];
  groupId: Group[];
  departmentId: Department[];
  password: string;
  email: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SigninForm {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  cpassword: string;
}

export interface Faculty {
  _id: string;
  groupName: string;
}

export interface Department {
  _id: string;
  depName: string;
}

interface Reaction {
  _id: string;
  like: boolean;
  userId: UserFullName;
}

interface UserFullName {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Comment {
  _id: string;
  comment: string;
  userId: UserFullName;
  createdAt: string;
}

export interface Grade {
  _id: string;
  gradeName: string;
}

export interface Post {
  _id: string;
  isVisible: boolean;
  isEvent: boolean;
  eventDate: string;
  eventEndDate: string;
  eventLocation: string;
  title: string;
  description: string;
  departmentId: Department;
  createdAt: string;
  reactionId: Reaction[];
  commentId: Comment[];
  userId: UserFullName;
  gradeId: Grade[];
}

export interface searchResults {
  searchInput: string;
  searchInTitle: Post[];
  searchInDescription: Post[];
}
