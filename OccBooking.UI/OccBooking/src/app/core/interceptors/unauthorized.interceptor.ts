import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
            if ((this.isDataManipulatingRequest(req)) && error.status === 401) {
                this.authService.logOut();
                this.router.navigateByUrl('');
                console.log('Token has expired');
            }
            return throwError(error);
        }));
    }

    private isDataManipulatingRequest(req: HttpRequest<any>): boolean {
        return req.method === 'POST' || req.method === 'DELETE' || req.method === 'PUT';
    }
}
