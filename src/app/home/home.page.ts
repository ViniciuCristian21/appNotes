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
  confirm: boolean = false;
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

  confirmData(){
   const sub = this.notes.subscribe((data: any) =>{
     sub.unsubscribe();
     if(data == ""){
      this.confirm = true;
      console.log("vazio")
    }else{
      console.log('tudo ok')
    }
   })
  }
  getAll(){
    this.notes = this.notesService.getAll();
    this.confirmData();
  }
}
