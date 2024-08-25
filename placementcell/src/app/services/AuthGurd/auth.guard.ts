// auth.guard.ts
import { CanActivateFn } from '@angular/router';
 
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Use Angular's inject function
  const router = inject(Router); // Inject Router to navigate

  if (authService.isAuthenticated()) {
    return true; // User is authenticated
  } else {
    router.navigate(['/login']); // Redirect to login page
    return false; // User is not authenticated
  }
};
