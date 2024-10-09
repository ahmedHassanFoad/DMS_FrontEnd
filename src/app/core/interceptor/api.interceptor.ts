import { HttpInterceptorFn } from '@angular/common/http';

export const myInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const localToken = localStorage.getItem('token');
  if (localToken) {
    const myreq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localToken}`, // Use backticks for string interpolation
      },
    });
    return next(myreq);
  } else {
    return next(req); // If there's no token, proceed without modifying the request
  }
};
