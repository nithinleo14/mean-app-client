import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Contact} from './contact';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: Http) { }

  getContacts(){
    return this.http.get('http://localhost:3000/api/contacts')
          .pipe(map( res => res.json()));
  }


  addContact(newContact) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/contacts', newContact, { headers: headers })
      .pipe(map(res => res.json()));
  }

  deleteContact(id){
    return this.http.delete("http://localhost:3000/api/contacts/"+ id)
      .pipe(map(res => res.json()));
  }

  updateContact(id, upContact){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put("http://localhost:3000/api/contacts/"+ id, upContact, { headers: headers })
    .pipe(map(res => res.json()));
  }
}


