import {Injectable} from '@angular/core';
import {Angular2Apollo} from "angular2-apollo";
import gql from "graphql-tag/index"; import {Observable} from "rxjs";

const AllPostsQuery = gql`
    query allPosts {
        allPosts {
            id
            description
            imageUrl
        }
    }
`;

@Injectable()
export class PostsService {
    private _allPosts;

    constructor(private apollo: Angular2Apollo) {
        this._allPosts = this.apollo.watchQuery({
            query: AllPostsQuery
        });

        this._allPosts.subscribe((data)=>{
            console.log('refetched!');
        });

        Observable.interval(500).subscribe(() => {
            this._allPosts.refetch();
        });
    }

    allPosts() {
        return this._allPosts;
    }

    deletePost(id: string) {
        this.apollo.mutate({
            mutation: gql`
                mutation ($id: String!) {
                    deletePost(id: $id) {
                        id
                    }
                }
            `,
            variables: {
                id: id,
            },
        }).subscribe(() => {
            this._allPosts.refetch();
        });
    }

    createPost(description: string, imageUrl: string) {
        return new Promise((resolve, reject)=>{
            this.apollo.mutate({
                mutation: gql`
                    mutation ($description: String!, $imageUrl: String!){
                        createPost(description: $description, imageUrl: $imageUrl) {
                            id
                        }
                    }
                `,
                variables: {
                    description: description,
                    imageUrl: imageUrl,
                },
            }).subscribe(() => {
                this._allPosts.refetch();
                resolve();
            }, reject);
        })
    }
}
