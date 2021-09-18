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
  hasChange: boolean = false;
  search: string;
  fileterData: any[] = [];
  dataSearch: Observable<any[]>;
  data: any[] = [];
  constructor(private notesService: NoteService,
              private alert:AlertService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll(){
    try {
      this.notes = this.notesService.getAll();
    } catch (err) {
      console.log(err)
    }
  }
 ionViewWillEnter(){
    this.confirmData();
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

  async confirmData(){
    await this.notes.forEach( (item)=> {
      this.data = item;
    })
    this.confirm = this.data.length === 0 ? true : false;
    console.log(this.confirm)
  }
  async getSearchAll(event){
    let key = event.target.value;
    // let lowerCaseKey = key.toLowerCase();

    if (key.length > 0) {
      this.dataSearch = undefined;
      try {
        this.dataSearch = await this.notesService.searchAll(key)
      } catch (err) {
        console.log(err)
      }
    }
    console.log(this.dataSearch)
  }
  searchOpen(){ //Abrir a pesquisa
    console.log("Abriu")
    this.hasChange = true;
  }
  searchClose(){ //fechar a barra de pesquisa
    console.log("Fechou")
    this.hasChange = false;
    this.search = "";
    this.dataSearch = undefined;
  }
}
