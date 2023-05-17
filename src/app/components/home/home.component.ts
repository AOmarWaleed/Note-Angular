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
  allNotes: any[] = [];
  constructor(private noteSer: NoteService, private _dialog: MatDialog) {}
  ngOnInit(): void {
    this.getAllNote();
  }

  getAllNote() {
    this.noteSer.getAllNotes().subscribe((r) => {
      console.log(r);
      if (r.message === 'success') {
        this.allNotes = r.Notes;

        console.log(this.allNotes);
        
      }else if (r.message  == 'no notes found') {
        this.allNotes = [];
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
          console.log('hi');
          
          this.getAllNote();
      });
  }
}
