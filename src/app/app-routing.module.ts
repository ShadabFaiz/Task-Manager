import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "task",
    loadChildren: () =>
      import("./pages/tasks/tasks.module").then((m) => m.TasksModule),
  },
  {
    path: "user",
    loadChildren: () =>
      import("./pages/users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "**",
    redirectTo: "task",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
