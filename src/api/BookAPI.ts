import {
  CollectionReference,
  DocumentReference,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { BookModel, IBook } from "./models/book.model";
import { db } from "../utils/firebase";
import { uuidv4 } from "@firebase/util";
import { UserModel } from "./models/user.model";
import { CommentModel } from "./models/coment.model";

export async function addBook(book: IBook, userId: string) {
  const id = uuidv4();
  const userRef = doc(db, "users", userId) as DocumentReference<UserModel>;
  await setDoc<BookModel>(
    doc(db, "books", id) as DocumentReference<BookModel>,
    {
      ...book,
      id,
      userRef,
      commentsRef: [],
    }
  );
}

export async function getBook(id: string) {
  const docRef = doc(db, "books", id) as DocumentReference<BookModel>;
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export function getBookDocRef(bookId: string): DocumentReference<BookModel> {
  return doc(db, "books", bookId) as DocumentReference<BookModel>;
}

export async function getAllBooks() {
  const col = collection(db, "books") as CollectionReference<BookModel>;
  const snapshot = await getDocs(col);
  const books: BookModel[] = [];
  snapshot.forEach((book) => {
    books.push({ ...book.data() });
  });
  return books;
}

export async function getBooks(start: number) {
  const col = query(
    collection(db, "books") as CollectionReference<BookModel>,
    limit(start)
  );
  const snapshot = await getDocs(col);
  const books: BookModel[] = [];
  snapshot.forEach((book) => {
    books.push({ ...book.data() });
  });
  return books;
}