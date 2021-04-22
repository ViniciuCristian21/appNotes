import { NoteService } from './../shared/note.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../shared/note';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  notes: Note;
  notesId: string;
  constructor(private router: Router,
              private notesService: NoteService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.notes = new Note;
    this.notesId = this.activatedRoute.snapshot.params['id'];
    this.getById();
  }

 async getById(){
  if(this.notesId){
    const subscribe =  await this.notesService.getById(this.notesId).subscribe( (data: any) =>{
      subscribe.unsubscribe();
      const { description } = data;
      this.notes.description = description;
  });
  }
}

  async onSubmit(){
    // Tem id? se tiver atualizar se nao salvar novo
    if(this.notesId){
      try {
        await this.notesService.updateNotes(this.notes, this.notesId);
        // mensagem OK
        this.router.navigate(['/home/']);
      } catch (error) {
        // mensagem error
        console.log(error);
      }
    } else{
      try {
        await this.notesService.addNotes(this.notes);
        // mensagem OK
        this.router.navigate(['/home/']);
      } catch (error) {
        // mensagem error
        console.log(error);
      }
    }
  }
}
