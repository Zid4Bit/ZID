import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-http-error-dialog',
  templateUrl: './errordialog.component.html'
})
export class ErrorDialogComponent implements OnInit {
  title = 'bomc - Error Dialog';

  dialogData: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: string) {

  }

  ngOnInit() {
    this.dialogData = this.data;
  }
}
