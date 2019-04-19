import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog/blog.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articleID: string;
  article: any;
  articleType: string;
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.articleID = params['slug'];
      this.articleType = params['type'];

      if (this.articleType === 'featured') {
        this.featuredArticle(this.articleID);
      } else {
        this.blogArticle(this.articleID);
      }

    });
  }

  featuredArticle(articleID) {
    this.blogService.getFeaturedArticle(articleID).subscribe((data: any) => {
      this.article = data[0];
    });
  }

  blogArticle(articleID) {
    this.blogService.getBlogPost(articleID).subscribe((data: any) => {
      this.article = data[0];
    });
  }

}
