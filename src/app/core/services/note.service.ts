import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  baseUrl = 'https://sticky-note-fe.vercel.app';
  token = localStorage.getItem('token')
  constructor(private _http:HttpClient , private authSer:AuthService) { }

  getAllNotes() :Observable<any>{
    let data=  {
      token: this.token,
      userID:this.authSer.userData.getValue()._id
    }
    return this._http.post(`${this.baseUrl}/getUserNotes` , data);
    
  }
  
  addNote(fromNoteDialogComponent : any):Observable<any>{
    let data = {
      token:this.token,
      citizenID: this.authSer.userData.getValue()._id,
      ...fromNoteDialogComponent
    }
    return this._http.post(`${this.baseUrl}/addNote` , data);
  }
  upadteNote(fromNoteDialogComponent: any):Observable<any>{
    let data = {
      token:this.token,
      ...fromNoteDialogComponent
    }
    return this._http.put(`${this.baseUrl}/updateNote` , data);
  }
  deletedNote(noteId: string):Observable<any>{
    let data = {
      token:this.token,
      NoteID:noteId
    }
    return this._http.delete(`${this.baseUrl}/deleteNote` , {
      body:data
    });
  }
}
