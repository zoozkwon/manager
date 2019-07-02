import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private _READER: any = new FileReader();
  private _REMOTE_URI: string =	"http://ec2-15-164-60-92.ap-northeast-2.compute.amazonaws.com/";

  constructor(public http: HttpClient) {}

  handleImageSelection(data: any): Observable<any> {
    const file	= data.file;

    this._READER.readAsDataURL(file);
    return Observable.create((observer) => {
      this._READER.onloadend = () => {
        observer.next(this._READER.result);
        observer.complete(); };
    });
  }

  isCorrectFileType(file) {
    return (/(gif|jpg|jpeg|png)$/i).test(file);
  }

  uploadImageSelection(file: string, mimeType: string): Observable<any> {
    const headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
        fileName: any   = Date.now() + '.' + mimeType,
        options: any = { "name" : fileName, "file" : file , "act" : "images.procUpImages"};
    return this.http.post(this._REMOTE_URI + '/parse-upload.php', JSON.stringify(options), headers);
  }
}
