import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from 'src/app/core/services/note.service';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  todos: any[] = [];
  isLoading: boolean = false ;
  constructor(private noteSer: NoteService, private _dialog: MatDialog) {}
  ngOnInit(): void {
    this.getAllNote();
  }

  getAllNote() {
    this.isLoading = true ;
    this.noteSer.getAllNotes().subscribe((r) => {
      this.isLoading = false ;
      if (r.message === 'success') {
        this.todos = r.todos;

        console.log(this.todos);
        
      }
    });
  }

  markNoteCompleted(id:any){
    this.noteSer.markNoteCompleted(id).subscribe((r) => {
      if (r.message === 'success') {
        this.getAllNote()        
      }
    });
  }

  openDialog(mode: string, note?: any) {
    this._dialog
      .open(NoteDialogComponent, {
        minHeight: '200px',
        minWidth: '400px',
        data: {
          mode,
          note: note,
        },
      })
      .afterClosed()
      .subscribe(() => {
          this.getAllNote();
      });
  }
}
