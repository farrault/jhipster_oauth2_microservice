import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { Author } from 'app/shared/model/oauth2ms/author.model';
import { AuthorService } from './author.service';
import { AuthorComponent } from './author.component';
import { AuthorDetailComponent } from './author-detail.component';
import { AuthorUpdateComponent } from './author-update.component';
import { AuthorDeletePopupComponent } from './author-delete-dialog.component';

@Injectable()
export class AuthorResolve implements Resolve<any> {
    constructor(private service: AuthorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Author();
    }
}

export const authorRoute: Routes = [
    {
        path: 'author',
        component: AuthorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'oauth2MultigatewayApp.oauth2MsAuthor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'author/:id/view',
        component: AuthorDetailComponent,
        resolve: {
            author: AuthorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'oauth2MultigatewayApp.oauth2MsAuthor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'author/new',
        component: AuthorUpdateComponent,
        resolve: {
            author: AuthorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'oauth2MultigatewayApp.oauth2MsAuthor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'author/:id/edit',
        component: AuthorUpdateComponent,
        resolve: {
            author: AuthorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'oauth2MultigatewayApp.oauth2MsAuthor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const authorPopupRoute: Routes = [
    {
        path: 'author/:id/delete',
        component: AuthorDeletePopupComponent,
        resolve: {
            author: AuthorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'oauth2MultigatewayApp.oauth2MsAuthor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
