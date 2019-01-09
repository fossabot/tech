// @flow

import {Observable} from "rxjs";
import {Subscriber} from "rxjs";

class HttpHelper {

    timeout: number = 100;

    // noinspection JSMethodCanBeStatic
    _createDefaultRequest(url: string[], method: string, body: any = null): Request {
        let h: Headers = new Headers();
        h.append("Authorization", "Basic " + btoa("admin:password"));
        h.append("Content-Type", "application/json");

        // RequestInit
        let request = { method: method,
            headers: h,
            mode: 'cors',
            cache: 'default',
        };

        if(body) {
            request.body = JSON.stringify(body);
        }

        return new Request(url.join("/"), request);
    };

    _createGetRequest(url: string[]): Request {
        return this._createDefaultRequest(url, "get");
    }

    getText(...url: string[]): Observable {
        return Observable.create((observer: Subscriber) => {
            const request: Request = this._createGetRequest(url);

            fetch(request)
                .then((response) => {
                    response.text().then((data) => {
                        if (response.ok) {
                            observer.next(data);
                            observer.complete();
                        } else {
                            console.error(data, response.status, request.url);
                            observer.error(data)
                        }
                    })
                })
                .catch((e) => {
                    console.error(e.message, request.url);
                    observer.error(e)
                });
        });
    }

    // --------   UNUSED SO FAR ----------------------

    _createPostRequest(body, ...url: string[]): Request {
        return this._createDefaultRequest(url, "post", body);
    }

    _createDeleteRequest(...url: string[]): Request {
        return this._createDefaultRequest(url, "delete");
    }

    getJson(request) {
        return Observable.create((observer: Subscriber) => {
            fetch(request)
                .then((response) => {
                    response.json().then((data) => {
                        if (response.ok) {
                            observer.next(data);
                            observer.complete();
                        } else {
                            console.error(data, response.status, request.url);
                            observer.error(data)
                        }
                    })
                })
                .catch((e) => {
                    console.error(e.message, request.url);
                    observer.error(e)
                });
        });
    }

}

export const httpHelper: HttpHelper = new HttpHelper();