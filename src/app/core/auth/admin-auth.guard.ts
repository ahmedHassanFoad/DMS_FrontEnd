import { bootstrapApplication } from '@angular/platform-browser';
import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const authantcation =inject(AuthService);
  const router = inject(Router);
  let isAdmin:boolean=false;
  authantcation.isAdmin$.subscribe((res:boolean)=>{
   isAdmin=res
  })
  if(isAdmin){
    return true 
  }
  else{
    router.navigateByUrl('workspace');
    
    return false
  }
};
