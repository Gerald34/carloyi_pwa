import {Inject, Injectable} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
// import 'firebase/app';
import { ChatMessage } from '../models/chat-message.model';
import { Upload } from '../models/upload.module';
import { Subject } from 'rxjs/Subject';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AngularFireStorage } from 'angularfire2/storage';
import { ShowroomService } from "./showroom/showroom.service";

@Injectable()
export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage>;
  userName: string;
  private getUsers: any;
  public chatActiveSubject = new Subject<any>();
  private chatID: string;
  users: AngularFireList<any>;
  ActiveUserChat = new Subject<any>();
  ActiveFeed = new Subject<any>();
  userInformation = this.storage.get('userInformation');
  dealerName: any;
  localStorage = this.storage.get('authState');
  file: any;

  /**
   *
   * @param storage
   * @param db
   * @param afStorage
   * @param afAuth
   * @param showroomService
   */
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private db: AngularFireDatabase,
    private afStorage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private showroomService: ShowroomService
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
        this.getUsers = this.getUser(this.user.uid).valueChanges();
        this.getUsers.subscribe(a => {
          this.userName = a.displayName;
        });
      } else if (typeof this.localStorage !== undefined) {
        this.user = this.localStorage;
        this.getUsers = this.getUser(this.user.uid).valueChanges();
        this.getUsers.subscribe(a => {
          this.userName = a.displayName;
        });
      } else {
        this.user = null;
      }
    });
  }

  /**
   * Store Activation data
   * @param data
   */
  public storeActivation(data) {
    this.getActivation(data);
  }

  /**
   * Get Activation data
   * @param data
   */
  public getActivation(data) {
    this.chatActiveSubject.next(data);
  }

  /**
   *
   * @param chatID
   */
  storeActivefeed(chatID) {
    this.getActiveFeed(chatID);
  }

  /**
   *
   * @param chatID
   */
  getActiveFeed(chatID) {
    this.ActiveFeed.next(chatID);
  }

  /**
   *
   */
  getActiveDeals() {
    return this.db.list('active_deals');
  }

  /**
   * Get User Information
   * @returns {AngularFireObject<any>}
   */
  getUser(userId) {
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  /**
   * get all users
   * @returns {AngularFireList<any>}
   */
  getAllUsers() {
    const path = 'users';
    return this.db.list(path);
  }

  /**
   * Create chat
   * @param interested
   */
  createChat(interested) {
    const dealerID = interested.response.response.dealer_id;
    return this.showroomService.getDealerName(dealerID).subscribe((data: any) => {
      if (data !== 'undefined') {
        this.dealerName = data.dealer.name;
        const userID = interested.offer[0].user_id;
        const carID = interested.offer[0].car_id;
        const carName = interested.offer[0].name;
        const offer = interested.offer[0].offer;
        this.chatID = Math.random().toString(36).substr(2, 10);
        const timestamp = this.getTimeStamp();
        const path = 'active_deals';
        const chatObject = {
          chatID: this.chatID,
          userID: userID,
          dealerID: dealerID,
          carID: carID,
          time: timestamp,
          carName: carName,
          offer: offer,
          displayName: this.userName,
          dealerName: this.dealerName
        };

        this.db.list(path).push(chatObject);
        this.storeActivation(chatObject);
      } else {
        return data;
      }

    });

  }

  /**
   *
   * @param chatID
   */
  getChatById(chatID): AngularFireList<ChatMessage> {
    // Query create list binding
    return this.db.list(
      `messages/${chatID}`,
      ref => ref.orderByKey().limitToLast(25)
    );
  }

  /**
   * Send Message to active dealer by unique chat id
   * @param {string} message
   * @param targetID
   */
  sendMessage(message: string, targetID: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages(targetID);
    this.chatMessages.push({
      uid: this.user.uid,
      message: message,
      timeSent: timestamp,
      userName: this.userName,
      email: email,
      file: 'none',
      name: 'none'
    });
  }

  /**
   * Get Messages from chatroom
   * @returns {AngularFireList<ChatMessage>}
   */
  getMessages(targetID): AngularFireList<ChatMessage> {
    // Query create list binding
    return this.db.list(
      `messages/${targetID}`,
      ref => ref.orderByKey().limitToLast(25)
    );
  }

  /**
   * Get send message time
   * @returns {string}
   */
  getTimeStamp() {
    const now = new Date();
    const date =
      now.getUTCFullYear() +
      '/' +
      (now.getUTCMonth() + 1) +
      '/' +
      now.getDate();
    const time =
      now.getUTCHours() + ':' + now.getMinutes() + ':' + now.getUTCSeconds();

    return date + ' ' + time;
  }

  /**
   *
   * @param targetID
   */
  getUserChatData(targetID) {
    return this.getMessages(targetID);
  }

  /**
   * File Upload (jpeg, jpg, pdf) only
   * @param {Upload} upload
   * @param chatID
   */
  pushUpload(upload: Upload, chatID) {

    const basePath = `/uploads`;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        return upload.progress;
      }, error => {
        // upload failed
        return error;
      }, () => {
        // upload success
        const url = uploadTask.snapshot.ref.getDownloadURL();
        url.then(getUrl => {
          this.file = getUrl;
          const timestamp = this.getTimeStamp();
          const email = this.user.email;

          const data = {
            email: email,
            message: 'none',
            timeSent: timestamp,
            uid: this.user.uid,
            userName: this.userName,
            file: this.file,
            name: upload.file.name,
            fileType: upload.file.type
          };

          this.saveFileData(data, chatID);
        }).catch(error => {
          return error;
        });
      }
    );
  }

  /**
   * Writes the file details to the realtime db
   * @param data
   * @param chatID
   */
  private saveFileData(data, chatID) {
    const basePath = `/messages/${chatID}`;
    this.db.list(`${basePath}/`).push(data);
  }

  /**
   *
   * @param chatID
   */
  getSavedFiles(chatID) {
    const basePath = `/messages/${chatID}`;
    return this.db.list(`${basePath}/`, ref => ref.orderByKey().limitToLast(25));
  }

}
