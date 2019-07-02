import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class ApiService {
    private Url = 'http://ec2-54-180-82-160.ap-northeast-2.compute.amazonaws.com/MyApp-Group';
    constructor(private http: HttpClient) {

    }

    loginApi(data): any {
        return new Promise((resolve) => {
            this.http.post(this.Url + '/API.php', data, httpHeaders).subscribe(
                (res: any) => {
                    const DATA = JSON.parse(res);
                    if (DATA.error !== 0) {
                        window.alert( DATA.message );
                    } else {
                        resolve(DATA);
                    }
                },
                err => {
                    window.alert( err.message );
                }
            );
        });
    }

    sendApi(data): any {
        return new Promise((resolve) => {
            this.http.post(this.Url + '/API.php', data, httpHeaders).subscribe(
                (res: any) => {
                    const DATA = JSON.parse(res);
                    if (DATA.error !== 0) {
                        window.alert( DATA.message );
                    } else {
                        resolve(DATA);
                    }
                },
                err => {
                    window.alert( err.message );
                }
            );
        });
    }

    getUrl(data): any {
        return new Promise((resolve) => {
            if ( data === 'logo') {
                resolve('http://ec2-54-180-82-160.ap-northeast-2.compute.amazonaws.com/uploadImage/shop_logo/');
            } else if ( data === 'user_thumbnail') {
                resolve('http://ec2-54-180-82-160.ap-northeast-2.compute.amazonaws.com/uploadImage/user_thumbnail/');
            } else if ( data === 'banner') {
                resolve('http://ec2-54-180-82-160.ap-northeast-2.compute.amazonaws.com/uploadImage/shop_banner/');
            }
        });
    }
}
