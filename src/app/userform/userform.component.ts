import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { User } from '../user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {
  
  userForm!: FormGroup;
  users: any
  constructor(private formBuilder: FormBuilder,private userService: UserService,private dataService: DataService,@Inject(MAT_DIALOG_DATA) public data: User
  ,public dialogRef: MatDialogRef<UserformComponent>) {
    
    
  }
 
  ngOnInit(): void {
    
    this.userForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required,Validators.email]],
      // address: [this.users.address.city, Validators.required]
      address: this.formBuilder.group({
        city: ["", Validators.required]
      })

      
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const newUser: User =this.userForm.value
  console.log(newUser)

    this.userService.addUser(newUser).subscribe(addedUser => {
      // Close the dialog and pass user data
    
      this.dialogRef.close(addedUser);
     
    });

  }

  

 
}
  
