import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-password-successfully',
  templateUrl: './change-password-successfully.component.html',
  styleUrls: ['./change-password-successfully.component.css']
})
export class ChangePasswordSuccessfullyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChangePasswordSuccessfullyComponent>) { }

  ngOnInit(): void {
  }

}
