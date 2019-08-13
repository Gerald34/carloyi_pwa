import { Injectable } from '@angular/core';
import { ConstantsService } from '../constants.service';
import { HttpClient } from '@angular/common/http';
import { Collection } from "../../models/collection.model";
import { Observable } from "rxjs/Observable";
import { Article } from "../../models/article.model";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  // Blog
  readonly newsPosts = this.paths.api + '/api/blog/get';
  readonly latest = this.paths.api + '/api/blog/latest';
  readonly blog_post = this.paths.api + '/api/blog/post/';
  readonly olderPosts = this.paths.api + '/api/blog/older_posts';

  // Articles
  readonly latestArticles = this.paths.api + '/api/articles/latest';
  readonly articleCollection = this.paths.api + '/api/articles/collection/';
  readonly article = this.paths.api + '/api/articles/getFeaturedArticle/';

  constructor( private paths: ConstantsService, private http: HttpClient ) { }

  /**
   * Get new posts
   */
  public getNewsPosts() {
    return this.http.get(this.newsPosts);
  }

  /**
   * Latest post
   */
  public latestPost(): Observable<any> {
    return this.http.get(this.latest);
  }

  /**
   * Latest article
   */
  public latestArticle(): Observable<Article> {
    return this.http.get<Article>(this.latestArticles);
  }

  /**
   * Get article collection
   * @param currentArticle
   */
  public getArticleCollection(currentArticle): Observable<Collection> {
    return this.http.get<Collection>(this.articleCollection + currentArticle);
  }

  /**
   * Get featured articles
   * @param articleSlug
   */
  public getFeaturedArticle(articleSlug) {
    return this.http.get(this.article + articleSlug);
  }

  /**
   * Get blog post
   * @param articleSlug
   */
  public getBlogPost(articleSlug) {
    return this.http.get(this.blog_post + articleSlug);
  }

  public olderArticles()  {
    return this.http.get(this.olderPosts);
  }
}
