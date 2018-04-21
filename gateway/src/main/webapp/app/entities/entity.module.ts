import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Oauth2MultigatewayAuthorModule as Oauth2MsAuthorModule } from './oauth2ms/author/author.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        Oauth2MsAuthorModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Oauth2MultigatewayEntityModule {}
