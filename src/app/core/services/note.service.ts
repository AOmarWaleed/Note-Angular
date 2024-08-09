import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  // ! delete
  token = "545"
  // ! delete

  baseUrl = 'https://todos.routemisr.com/api/v1/todos';
  APIKey: null | string = null;
  constructor(private _http: HttpClient, private authSer: AuthService) {

    if (localStorage.getItem('apiKey')) {

      this.APIKey = localStorage.getItem('apiKey');
      console.log(this.APIKey, 'there is one');

    } else {
      this.getAPIKey().subscribe((r) => {
        console.log(this.APIKey);

        localStorage.setItem('apiKey', r.apiKey);
        this.APIKey = r.apiKey;
      })
    }

  }



  getAPIKey(): Observable<any> {
    return this._http.get('https://todos.routemisr.com/api/v1/getApiKey');
  }

  getAllNotes(): Observable<any> {
    return this._http.get(`https://todos.routemisr.com/api/v1/todos/${this.APIKey}`);

  }

  addNote(data: any): Observable<any> {


    return this._http.post(`https://todos.routemisr.com/api/v1/todos`, {
      ...data,
      apiKey: this.APIKey
    });
  }

  deletedNote(todoId: string): Observable<any> {
    return this._http.delete(`https://todos.routemisr.com/api/v1/todos`
      ,
      {
        body: {
          todoId
        }
      });
  }

  markNoteCompleted(todoId: string): Observable<any> {
    return this._http.put(`https://todos.routemisr.com/api/v1/todos`
      ,
      {

        todoId

      });
  }
}
