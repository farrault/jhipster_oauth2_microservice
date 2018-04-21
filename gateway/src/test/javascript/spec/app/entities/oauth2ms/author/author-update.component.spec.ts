/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Oauth2MultigatewayTestModule } from '../../../../test.module';
import { AuthorUpdateComponent } from 'app/entities/oauth2ms/author/author-update.component';
import { AuthorService } from 'app/entities/oauth2ms/author/author.service';
import { Author } from 'app/shared/model/oauth2ms/author.model';

describe('Component Tests', () => {
    describe('Author Management Update Component', () => {
        let comp: AuthorUpdateComponent;
        let fixture: ComponentFixture<AuthorUpdateComponent>;
        let service: AuthorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Oauth2MultigatewayTestModule],
                declarations: [AuthorUpdateComponent],
                providers: [AuthorService]
            })
                .overrideTemplate(AuthorUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AuthorUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuthorService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Author(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.author = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Author();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.author = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
