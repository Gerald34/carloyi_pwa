import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog/blog.service';
import { UriService } from '../services/uri/uri.service';
import { Article } from "../models/article.model";
import { Collection } from "../models/collection.model";
import { Blog } from "../models/blog.model";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  articleID: string;
  article: Article;
  blogCollection: Blog;
  articleType = 'featured';
  imagePath = this.uri.BlogImages;
  collection: Array<Collection>;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private uri: UriService
  ) { }

  ngOnInit() {
    this.articleID = this.route.snapshot.params.slug;
    this.featuredArticle(this.articleID);
    // this.route.params.subscribe(params => {
    //   this.articleID = params['slug'];
    //   this.featuredArticle(this.articleID);
    // });
  }

  /**
   * Get Article Object
   * @param articleID
   */
  private featuredArticle(articleID) {
    this.blogService.getFeaturedArticle(articleID).subscribe((data: any) => {
      this.article = data;
      this.featuredArticleCollection(data.id);
    });
  }

  /**
   * Get Article Collection Object
   */
  private featuredArticleCollection(currentArticle) {
    this.blogService.getArticleCollection(currentArticle).subscribe((collection: any) => {
      this.collection = collection;
    });
  }

  /**
   * Get Blog Object
   * @param articleID
   */
  private blogArticle(articleID) {
    this.blogService.getBlogPost(articleID).subscribe((data: any) => {
      this.blogCollection = data[0];
    });
  }

}
