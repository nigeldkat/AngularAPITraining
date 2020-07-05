import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { UserService  } from '../_services/user.service';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

    constructor(
        private userService: UserService,
        private router: Router,
        private alertService: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<User> {
            return this.userService.getUser(route.params.id).pipe(
                catchError( error => {
                    this.alertService.error('Problem retrievieng data');
                    this.router.navigate(['/members']);
                    return of(null);
                 })
            );
        }
}
