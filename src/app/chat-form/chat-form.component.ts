import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import * as $ from 'jquery';
import { Upload } from '../models/upload.module';
import * as _ from 'lodash';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message: string;
  selectedFiles: FileList;
  currentUpload: Upload;
  @Input() chatID;

  constructor(
    private chat: ChatService,
  ) {
  }

  ngOnInit() {
    $(function () {
      $('#upload_link').on('click', function (e) {
        e.preventDefault();
        $('#upload:hidden').trigger('click', function() {
          console.log('clicked here');
        });
      });
    });
  }

  public send() {
    this.chat.sendMessage(this.message, this.chatID);
    this.message = '';
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }

  detectFiles(event) {
    const selectedFiles = event.target.files[0];
    console.log(selectedFiles);
    this.uploadSingle(selectedFiles);
  }

  uploadSingle(selectedFiles) {
    const file = selectedFiles;
    console.log(file);

    this.currentUpload = new Upload(file);
    this.chat.pushUpload(this.currentUpload, this.chatID);
  }

  uploadMulti() {
    const files = this.selectedFiles;
    const filesIndex = _.range(files.length);

    _.each(filesIndex, (idx) => {

      this.currentUpload = new Upload(files[idx]);

      this.chat.pushUpload(this.currentUpload, this.chatID);

    });

  }
}
