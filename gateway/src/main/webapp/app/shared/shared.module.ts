import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { Oauth2MultigatewaySharedLibsModule, Oauth2MultigatewaySharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [Oauth2MultigatewaySharedLibsModule, Oauth2MultigatewaySharedCommonModule],
    declarations: [HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    exports: [Oauth2MultigatewaySharedCommonModule, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Oauth2MultigatewaySharedModule {}
