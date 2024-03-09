import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { UserformComponent } from '../userform/userform.component';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.css']
})
export class EditformComponent implements OnInit {
  userForm!: FormGroup;
  users: any
  constructor(private formBuilder: FormBuilder,private userService: UserService,private dataService: DataService,@Inject(MAT_DIALOG_DATA) public data: User
  ,public dialogRef: MatDialogRef<EditformComponent>) {
    
    this.users=data
    console.log(this.users)
  }
 
  ngOnInit(): void {
    
    this.userForm = this.formBuilder.group({
      name: [this.users.name, Validators.required],
      email: [this.users.email, [Validators.required, Validators.email]],
      // address: [this.users.address.city, Validators.required]
      address: this.formBuilder.group({
        city: [this.users.address.city, Validators.required]
      })

      
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const newUser: User ={
      id: this.users.id, // Set the default ID to 1
      ...this.userForm.value
    };
 

    this.userService.addUser(newUser).subscribe(addedUser => {
      // Close the dialog and pass user data
    
      this.dialogRef.close(newUser);
     
    });


  }
}
 
  

