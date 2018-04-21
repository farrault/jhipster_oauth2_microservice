import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAuthor } from 'app/shared/model/oauth2ms/author.model';

export type EntityResponseType = HttpResponse<IAuthor>;
export type EntityArrayResponseType = HttpResponse<IAuthor[]>;

@Injectable()
export class AuthorService {
    private resourceUrl = SERVER_API_URL + 'oauth2ms/api/authors';

    constructor(private http: HttpClient) {}

    create(author: IAuthor): Observable<EntityResponseType> {
        const copy = this.convert(author);
        return this.http
            .post<IAuthor>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(author: IAuthor): Observable<EntityResponseType> {
        const copy = this.convert(author);
        return this.http
            .put<IAuthor>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAuthor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAuthor[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IAuthor = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: IAuthor[] = res.body;
        const body: IAuthor[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Author.
     */
    private convertItemFromServer(author: IAuthor): IAuthor {
        const copy: IAuthor = Object.assign({}, author, {});
        return copy;
    }

    /**
     * Convert a Author to a JSON which can be sent to the server.
     */
    private convert(author: IAuthor): IAuthor {
        const copy: IAuthor = Object.assign({}, author, {});
        return copy;
    }
}
