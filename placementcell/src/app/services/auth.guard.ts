
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  // const router: Router = inject
  // const protectedRoutes: string[] = ['/dashboard'];
  // returnv protectedRoutes:includes(state.url) && !session
  // ?retrun
  return false;
};
