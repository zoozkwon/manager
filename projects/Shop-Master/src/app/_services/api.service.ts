import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class ApiService {
    private Url = 'http://ec2-15-164-60-92.ap-northeast-2.compute.amazonaws.com/MyApp-Group';
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
                        swal( DATA.message );
                    } else {
                        resolve(DATA);
                    }
                },
                err => {
                    swal( err.message );
                }
            );
        });
    }

    getUrl(data): any {
        return new Promise((resolve) => {
            if ( data === 'logo') {
                resolve('http://ec2-15-164-60-92.ap-northeast-2.compute.amazonaws.com/uploadImage/shop_logo/');
            }
        });
    }
}
