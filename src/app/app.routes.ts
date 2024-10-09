import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { WorkspaceComponent } from './featuers/WorkSpace/pages/workspace/workspace.component';
import { authGuard } from './core/auth/auth.guard';
import { DirectoryComponent } from './featuers/Directory/pages/directory/directory.component';
import { FileUploadComponent } from './featuers/Document/pages/file-upload/file-upload.component';
import { UserProfileComponent } from './featuers/user profile/user-profile/user-profile.component';
import { AdminDashboardComponent } from './featuers/admin/pages/admin-dashboard/admin-dashboard.component';
import { UserDocumentsComponent } from './featuers/admin/pages/user-documents/user-documents.component';
import { PannedUsersComponent } from './featuers/admin/pages/panned-users/panned-users.component';
import { SharedComponent } from './featuers/Directory/pages/shared/shared.component';
import { SharedDocumentsComponent } from './featuers/Document/pages/shared-documents/shared-documents.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'workspace',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: RegisterComponent,
  },
  {
    path: 'workspace',
    component: WorkspaceComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dir/:id',
    component: DirectoryComponent,
    canActivate: [authGuard],
  },
  {
    path: `file-Upload`,
    component: FileUploadComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'adminDashBoard',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'UserDocuments/:id',
    component: UserDocumentsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'pannedUsers',
    component: PannedUsersComponent,
    canActivate: [authGuard],
  },
  {
    path:"sharedDirs",
    component:SharedComponent,
    canActivate:[authGuard]
  }
  ,{
    path:'SharedDocs/:id',
    component:SharedDocumentsComponent,
    canActivate:[authGuard]
  }
];
