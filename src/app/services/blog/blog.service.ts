import { Injectable } from '@angular/core';
import { ConstantsService } from '../constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  // Blog Routes
  readonly newsPosts = this.paths.api + '/api/blog/get';
  readonly latest = this.paths.api + '/api/blog/latest';
  readonly article = this.paths.api + '/api/blog/featured/';
  readonly blog_post = this.paths.api + '/api/blog/post/';
  readonly olderPosts = this.paths.api + '/api/blog/older_posts';

  constructor( private paths: ConstantsService, private http: HttpClient ) { }

  public getNewsPosts() {
    return this.http.get(this.newsPosts);
  }

  public latestPost() {
    return this.http.get(this.latest);
  }

  public getFeaturedArticle(articleSlug) {
    return this.http.get(this.article + articleSlug);
  }

  public getBlogPost(articleSlug) {
    return this.http.get(this.blog_post + articleSlug);
  }

  public olderArticles()  {
    return this.http.get(this.olderPosts);
  }
}
