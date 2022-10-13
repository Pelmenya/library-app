import { IBook } from './i-book';
import { IUser } from './i-user';

export interface ILibrary {
    books: IBook[];
    users: IUser[];
}