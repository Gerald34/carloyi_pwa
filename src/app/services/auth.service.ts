import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private authState: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.user = afAuth.authState;
  }

  /**
   * AUTHORISED USER
   * @returns {Observable<firebase.User>}
   */
  authUser() {
    return this.user;
  }

  /**
   * Retrieve UserID
   * @returns {string}
   */
  get currentUserId(): string {
    if (this.authState !== null) {
      return this.authState.user.uid;
    }
  }

  /**
   * Firebase Login
   * @param {string} email
   * @param {string} password
   * @returns {Promise<void>}
   */
  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserStatus(status);
        return user;
      }).catch((error) => {
        return error;
      });
  }

  /**
   * Firebase SignIn
   * @param {string} email
   * @param {string} password
   * @param {string} displayName
   * @returns {Promise<void>}
   */
  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
        return user;
      }).catch((error: any) => {
        return error;
      });
  }

  updatePassword(email, newPassword) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, newPassword)
      .then((user: any) => {
      }).catch((error) => {
        return error;
      });
  }

  resetPassword(email: string) {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then((resolve: any) => {
        return 'sent';
      }).catch((error) => {
        return error;
      });
  }

  /**
   * Set User Data - firebase
   * @param {string} email
   * @param {string} displayName
   * @param {string} status
   */
  setUserData(email: string, displayName: string, status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };

    this.db.object(path).update(data).catch(error => console.log(error));
  }

  setUserID(userID): void {
    const path = `users/${this.currentUserId}`;

    const data = {
      id: userID
    };

    this.db.object(path).update(data).catch(error => console.log(error));
  }

  /**
   * Set User status - Firebase
   * @param {string} status
   */
  setUserStatus(status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      status: status
    };
  }
}
