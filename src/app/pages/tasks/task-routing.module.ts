import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskCreateComponent } from './components/tasks/create/create.component';
import { TaskListComponent } from './components/tasks/list/list.component';

const routes: Routes = [
    { path: 'create', component: TaskCreateComponent },
    { path: 'list', component: TaskListComponent },
    { path: '**', redirectTo: 'list' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TaskRoutingModule {}
