import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component ,Inject , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent implements OnInit {
  noteForm:FormGroup;
  heading: string = '';
  constructor(private _fb:FormBuilder , private noteSe:NoteService , @Inject(DIALOG_DATA) private dataFromHome:any , private dialogRef:DialogRef){
    this.noteForm = _fb.group({
      title:['' , Validators.required],
    })
  }
  ngOnInit(): void {
    this.heading = this.dataFromHome.mode;
  } 
  submit(){
    
    if(this.dataFromHome.mode == 'add'){
      this.addNote()
    
    }else if(this.dataFromHome.mode == 'delete'){
      this.deleteNote()
    }
    
  }

  setUpUpdate(){
    this.noteForm.patchValue(this.dataFromHome.note)
  }
  addNote(){
    this.noteSe.addNote(this.noteForm.value).subscribe((r)=> r.message === 'success' && this.dialogRef.close())
  }


  deleteNote(){
    this.noteSe.deletedNote(this.dataFromHome.note._id).subscribe((r)=> r.message === 'success' && this.dialogRef.close())
  }
}
