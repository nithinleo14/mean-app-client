import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];
  contact: Contact;
  first_name: string;
  last_name: string;
  phone: number;
  id?: string;
  upContact: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getData();
  }

  onClickForUpdate(contact:any){
    this.upContact = contact;
    this.first_name= contact.first_name;
    this.last_name= contact.last_name;
    this.phone= contact.phone;
  }

  onClickUpdate(){
    console.log(this.upContact._id);
    const upContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    };

    let contacts= this.contacts;
    this.contactService.updateContact(this.upContact._id, upContact)
    .subscribe(data=>{
      contacts.forEach((e, index) => {
        if (e._id == this.upContact._id) {
          return contacts[index] = upContact;
        }
      });
      console.log(this.contacts);
      this.getData();
    });
  }

  addContact() {
    const newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    };

    this.contactService.addContact(newContact)
      .subscribe(contact => {
        this.contacts.push(contact);
        this.getData();
      });
  }

  deleteContact(id: any) {
    let contacts = this.contacts;
    this.contactService.deleteContact(id)
      .subscribe(data => {
        // if (data.deletedCount == 1) {
        contacts.forEach((e, index) => {
          if (e._id == id) {
            return contacts.splice(index, 1);
          }
        });
        this.getData();
        // console.log(contacts);
        // }
      });
    // console.log(contacts);
    // this.getData();

  }

  getData() {
    this.contactService.getContacts()
      .subscribe(contacts => {
        this.contacts = contacts;
        console.log(contacts);
      });
  }

}
