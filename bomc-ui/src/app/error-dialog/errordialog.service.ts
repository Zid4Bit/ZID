import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from './errordialog.component';

export interface Error {
  reason: string;
  status: string;
}

@Injectable()
export class ErrorDialogService {

  constructor(public dialog: MatDialog) {

   }

  openDialog(data: {}): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('ErrorDialogService#openDialog - The dialog was closed');

    });
  }
}
