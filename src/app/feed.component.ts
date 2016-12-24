import {Component, OnInit} from '@angular/core';
import {ApolloQueryObservable} from 'angular2-apollo';
import 'rxjs/add/operator/toPromise';
import {ApolloQueryResult} from "apollo-client";
import {PostsService} from "./posts.service";

@Component({
    selector: 'feed',
    template: `
    <a routerLink="/create" class="fixed bg-white top-0 right-0 pa4 ttu dim black no-underline">+ New Post</a>
    <div class="w-100" style="max-width: 400px">
      <div class="pa3 bg-black-05 ma3" *ngFor="let post of allPostsSub | async | select: 'allPosts'">
        <div class="w-100" [ngStyle]="setImage(post.imageUrl)"></div>
        <div class="pt3">
          {{post.description}}&nbsp;
          <span class='red f6 pointer dim' (click)="handleDelete(post.id)">Delete</span>
        </div>
      </div>
    </div>
  `,
    host: {'style': 'width: 100%; display: flex; justify-content: center;'}
})

export class FeedComponent implements OnInit {

    allPostsSub: ApolloQueryObservable<ApolloQueryResult>;

    constructor(private postsService: PostsService) {
    }

    setImage(url: string) {
        const styles = {
            'background-image': `url(${url})`,
            'background-size': 'cover',
            'padding-bottom': '100%',
        };
        return styles;
    }

    handleDelete(id: string) {
        this.postsService.deletePost(id);
    }

    ngOnInit() {
        this.allPostsSub = this.postsService.allPosts();
    }
}
