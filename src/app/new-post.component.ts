import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Angular2Apollo} from 'angular2-apollo';

import gql from 'graphql-tag';
import {PostsService} from "./posts.service";

@Component({
    selector: 'new-post',
    template: `
    <div>
      <input
        type="text"
        class="form-control"
        id="descriptionInput"
        placeholder="Description"
        [(ngModel)]="description"
        name="description"
        required
      />
      <input
        type="text"
        class=""
        id="urlInput"
        placeholder="Url"
        [(ngModel)]="imageUrl"
        name="imageUrl"
      />
      <button 
        (click)="postImage()"
      >
        Post
      </button>
    </div>
  `
})
export class NewPostComponent {
    description: string;
    imageUrl: string;

    constructor(private router: Router,
                private postsService: PostsService) {
    }

    postImage(): void {

        this.postsService.createPost(this.description, this.imageUrl).then(() => {
            this.router.navigate(['/']);
        }).catch((error: any) => {
            alert(error);
        });

    }
}
