import { DocumentReference } from "firebase/firestore";
import { BookModel } from "./book.model";
import { UserModel } from "./user.model";

export interface IComment {
  comment: string;
  rating: number;
}

export interface CommentModel extends IComment {
  id?: string;
  bookRef: DocumentReference<BookModel>;
  userRef: DocumentReference<UserModel>;
}
