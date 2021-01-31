import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../tasks/services/user.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [UserService],
})
export class UsersModule {}
