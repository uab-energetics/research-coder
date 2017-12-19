import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {InsightsComponent} from './insights/insights.component';
import {LayoutComponent} from './layout.component';
import {ProfileComponent} from './settings/profile/profile.component';
import {SettingsComponent} from './settings/settings.component';
import {AccountComponent} from './settings/account/account.component';
import {SharedModule} from '../shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProjectsComponent } from './projects/projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectComponent } from './project/project.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { TreeModule } from 'angular-tree-component';
import { FormLayoutTreeComponent } from './form-builder/form-layout-tree/form-layout-tree.component';
import {MatProgressBarModule, MatSnackBarModule} from "@angular/material";
import { PubCoderComponent } from './pub-coder/pub-coder.component';
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        children: []
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
            path: 'account',
            component: AccountComponent
          },
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full'
          }
        ]
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
        path: "projects/:id",
        component: ProjectComponent
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
        path: '',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    TreeModule,
    MatProgressBarModule, MatSnackBarModule
  ],
  declarations: [
    LayoutComponent,
    HomeComponent,
    InsightsComponent,
    SettingsComponent,
    ProfileComponent,
    AccountComponent,
    ProjectsComponent,
    CreateProjectComponent,
    ProjectComponent,
    FormBuilderComponent,
    FormLayoutTreeComponent,
    PubCoderComponent
  ]
})
export class LayoutModule {
}
