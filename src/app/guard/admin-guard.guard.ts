import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthServiceService } from '../service/auth-service.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AdminGuardGuard implements CanActivate {

  constructor(private auth: AuthServiceService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      
    return this.auth.user$.pipe(
      take(1),
      map(user => user && user.roles.admin ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          alert("Admin only")
          console.error('Access denied - Admins only')
        }else{
          alert("welcome admin")
        }
      })
    );

  }
}
