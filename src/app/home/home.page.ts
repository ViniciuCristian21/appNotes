import { NoteService } from './../shared/note.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  hide: boolean;
  disabled: string;
  notes: Observable<any[]>;
  constructor(private notesService: NoteService) { }

  ngOnInit() {
    this.hide = false;
    this.verifify();
    this.getAll();
  }
  verifify(){
    if(this.hide == true){
      this.disabled = 'disable';
    }
  }

  getAll(){
    this.notes = this.notesService.getAll();
  }
}
