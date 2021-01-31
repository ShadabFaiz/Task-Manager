import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskCreateComponent } from './components/tasks/create/create.component';
import { TaskListComponent } from './components/tasks/list/list.component';
import { TaskService } from './services/task-service.service';
import { UserService } from './services/user.service';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
  declarations: [TaskCreateComponent, TaskListComponent],
  imports: [CommonModule, TaskRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [TaskService, UserService],
})
export class TasksModule {}
