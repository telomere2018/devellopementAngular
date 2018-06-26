import {User} from "../models/user.models";
import { Subject } from "rxjs";

export class UserService {
    
private users: User[] = [];
userSubject = new Subject<User[]>();

emitUsers(){
    this.userSubject.next(this.users.slice());
}
addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
}
}