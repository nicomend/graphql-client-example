import {Component} from '@angular/core';
import {PostsService} from "./posts.service";

@Component({
    selector: 'app-root',
    template: `
    <div class="w-100 flex justify-center">
      <router-outlet></router-outlet>
    </div>
  `,
    providers: [PostsService]
})
export class AppComponent {
}
