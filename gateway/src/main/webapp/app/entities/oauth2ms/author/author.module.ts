import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Oauth2MultigatewaySharedModule } from 'app/shared';
import {
    AuthorService,
    AuthorComponent,
    AuthorDetailComponent,
    AuthorUpdateComponent,
    AuthorDeletePopupComponent,
    AuthorDeleteDialogComponent,
    authorRoute,
    authorPopupRoute,
    AuthorResolve
} from './';

const ENTITY_STATES = [...authorRoute, ...authorPopupRoute];

@NgModule({
    imports: [Oauth2MultigatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AuthorComponent, AuthorDetailComponent, AuthorUpdateComponent, AuthorDeleteDialogComponent, AuthorDeletePopupComponent],
    entryComponents: [AuthorComponent, AuthorUpdateComponent, AuthorDeleteDialogComponent, AuthorDeletePopupComponent],
    providers: [AuthorService, AuthorResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Oauth2MultigatewayAuthorModule {}
