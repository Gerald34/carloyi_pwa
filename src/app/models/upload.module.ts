export class Upload {

  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  timeSent: string;
  chatID: any;

  constructor(file: File) {
    this.file = file;
  }
}
