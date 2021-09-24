import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Note } from './note';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesCollection: AngularFirestoreCollection<Note>;
  constructor(private afs: AngularFirestore,) {
    this.notesCollection = this.afs.collection<Note>('notes');
   }

  getAll(){ // buscar todos
    return this.afs.collection('notes')
      .snapshotChanges().pipe(
        map( changes => {
          return changes.map( s => {
            const id = s.payload.doc.id;
            const data = s.payload.doc.data() as Note
            return { id, ...data };
          })
        })
      )
 }

 removeNote(id: string){ // Remover nota
  this.notesCollection.doc<Note>(id).delete();
 }

 dateNew(){
  const data = new Date();
  const day = data.getDate()
  const month = data.getMonth() + 1;
  const year = data.getUTCFullYear();

  return day+"/"+month+"/"+year
 }

 //  Adicionar ao banco
 addNotes(notes: Note){
  const { description } = notes;

  this.afs.collection('notes').doc().set(
    {
      description: description,
      date: this.dateNew()
    }
  );
}
  // Pegar por id
  getById(id: string){ // buscar por Id
    return this.notesCollection.doc<Note>(id).valueChanges();
  }
  // Atualizar
  updateNotes(notes: Note, id: string){
    this.notesCollection.doc<Note>(id).update(Object.assign({}, notes));
  }

  // Pesquisa filtrada
  searchAll(key: string){
    return this.afs.collection('notes', ref => ref.orderBy('description').startAt(key).endAt(key + "\uf8ff"))
    .snapshotChanges().pipe(
      map( changes => {
        return changes.map( p => {
          const id = p.payload.doc.id;
          const data = p.payload.doc.data() as Note;
          return {id, ...data};
        })
      })
    )
  }
}
