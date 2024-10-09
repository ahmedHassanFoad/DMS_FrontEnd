import { Inject, inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authantcation =inject(AuthService);
  const router = inject(Router);
  const localData = localStorage.getItem('token');

  if (localData != null) {
    if (!authantcation.isLoggedIn()){

       router.navigateByUrl('login');
       return false
    }
    else return true;
  } 
  
  else {
    router.navigateByUrl('login');
    return false;
  }
};


