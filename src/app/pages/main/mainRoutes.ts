import { Routes } from "@angular/router";
import { MainComponent } from "./main.component";
import { SettingsComponent } from "./settings/settings.component";
import { ProfileComponent } from "./settings/profile/profile.component";
import { ProjectsComponent } from "./projects/projects.component";
import { CreateProjectComponent } from "./create-project/create-project.component";
import { ProjectFormPageComponent } from "./project-form/project-form-page.component";
import { FormBuilderComponent } from "./form-builder/form-builder.component";
import { PubCoderComponent } from "./pub-coder/pub-coder.component";
import { ConflictsComponent } from "./conflicts/conflicts.component";
import { DiscussComponent } from "./discuss/discuss.component";
import { MyTasksPageComponent } from "./my-tasks-page/my-tasks-page.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ProjectFormsComponent } from './project-forms/project-forms.component'
import { ProjectPublicationsComponent } from './project-publications/project-publications.component'
import { ProjectUsersComponent } from './project-users/project-users.component'
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component'
import { PubReposComponent } from "./pub-repos/pub-repos.component";
import { RenderComponent } from "../../core/codebooks/render/render.component";

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'pub-coder-4',
        loadChildren: './pub-coder-4/pub-coder-4.module#PubCoder4Module'
      },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: "welcome",
        component: WelcomeComponent
      },
      {
        path: 'render-codebook',
        component: RenderComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'create-project',
        component: CreateProjectComponent
      },
      {
        path: "project-dashboard",
        component: ProjectDashboardComponent
      },
      {
        path: "project-users",
        component: ProjectUsersComponent
      },
      {
        path: "project-publications",
        component: ProjectPublicationsComponent
      },
      {
        path: 'project-codebooks',
        component: ProjectFormsComponent
      },
      {
        path: "projects/:pid/forms/:fid",
        component: ProjectFormPageComponent
      },
      {
        path: 'forms/:id',
        component: FormBuilderComponent
      },
      {
        path: 'pub-coder/:id',
        component: PubCoderComponent
      },
      {
        path: "conflicts/:id",
        component: ConflictsComponent
      },
      {
        path: "discuss",
        component: DiscussComponent
      },
      {
        path: "tasks",
        component: MyTasksPageComponent
      },
      {
        path: 'pub-repos',
        component: PubReposComponent
      },
      {
        path: '',
        redirectTo: 'project-dashboard',
        pathMatch: 'full'
      }
    ]
  }
]
