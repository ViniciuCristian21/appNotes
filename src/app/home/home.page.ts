import { NoteService } from './../shared/note.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notes: Observable<any[]>;
  constructor(private notesService: NoteService,
              private alert:AlertService) { }

  ngOnInit() {
    this.getAll();
  }

  remove(id: string){
    this.alert.showConfirmarExclusão("esta anotação", ()=> this.removeNote(id) );
  }

  removeNote(id: string){
    this.notesService.removeNote(id)
    try {

      this.getAll();
    } catch (error) {
      console.log("ERROR: " + error)
    }
  }
  getAll(){
    this.notes = this.notesService.getAll();
  }
}
