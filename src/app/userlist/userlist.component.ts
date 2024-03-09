import { Component, OnInit } from '@angular/core';

import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserformComponent } from '../userform/userform.component';
import { EditformComponent } from '../editform/editform.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users: User[] = [];

  constructor(private userService : UserService ,private router: Router,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
     
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }
  // editUser(id: number): void {
  //   this.router.navigate(['/edit', id]);
  // }
  openDialog() : void {
    const dialogRef = this.dialog.open(UserformComponent);

    
    dialogRef.afterClosed().subscribe(updatedUser => {
     console.log(updatedUser)
      if (updatedUser) {
        // If user data is received from the dialog, update the user in the list
       
       
          this.users[ updatedUser.id-1] = updatedUser;
          console.log(this.users)
        
      }
    });
  }
  // editUser(id: number): void {
  //   // Fetch the user data based on ID
  //   const user = this.users.find(u => u.id === id);

  //   // Open the dialog and pass user data
  //   const dialogRef = this.dialog.open(UserformComponent, {
  //     data: user // Pass the user data to the dialog component
  //   });

  //   // Subscribe to dialog close event
  //   dialogRef.afterClosed().subscribe(updatedUser => {
     
  //     if (updatedUser) {
  //       // If user data is received from the dialog, update the user in the list
       
       
  //         this.users[ updatedUser.id-1] = updatedUser;
  //         console.log(this.users)
        
  //     }
  //   });
  // }
  editDialog(id: number) {
    
    const dialogRef = this.dialog.open(EditformComponent, {
      data: this.users[id-1]
    });

    
    dialogRef.afterClosed().subscribe(updatedUser => {
     console.log(updatedUser)
      if (updatedUser) {
        // If user data is received from the dialog, update the user in the list
       
       
          this.users[ updatedUser.id-1] = updatedUser;
          console.log(this.users)
        
      }
    });
  }
 
}
