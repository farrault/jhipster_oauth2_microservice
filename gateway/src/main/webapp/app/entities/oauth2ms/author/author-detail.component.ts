import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAuthor } from 'app/shared/model/oauth2ms/author.model';

@Component({
    selector: 'jhi-author-detail',
    templateUrl: './author-detail.component.html'
})
export class AuthorDetailComponent implements OnInit {
    author: IAuthor;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ author }) => {
            this.author = author.body ? author.body : author;
        });
    }

    previousState() {
        window.history.back();
    }
}
