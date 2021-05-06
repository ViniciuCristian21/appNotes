import { element } from 'protractor';
import { NoteService } from './../shared/note.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertService } from '../shared/alert.service';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notes: Observable<any[]>;
  confirm: boolean = false;
  hasChange: boolean = false;
  search: string;
  fileterData: any[] = [];
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
  getSearchAll(){
    this.search.length.toString();
    console.log(this.search)
  }
  searchOpen(){ //Abrir a pesquisa
    console.log("Abriu")
    this.hasChange = true;
  }
  searchClose(){ //fechar a barra de pesquisa
    console.log("Fechou")
    this.hasChange = false;
    this.search = "";
  }
  getAll(){
    this.notes = this.notesService.getAll();
    this.confirmData();
  }
}
