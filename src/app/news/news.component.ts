import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog/blog.service';
import { UriService } from '../services/uri/uri.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  featured: any;
  newsPosts: any;
  olderPosts: any;
  articleCollection: any;
  current: string;
  imagePath = this.uri.BlogImages;
  constructor(
    private blogService: BlogService,
    private uri: UriService
  ) { }

  ngOnInit() {
    this.getNews();
    this.getOlderPosts();
    this.getLatestArticle();
  }

  getNews() {
    this.blogService.getNewsPosts().subscribe((data: any) => {
      this.newsPosts = data;
    });
  }

  getOlderPosts() {
    this.blogService.olderArticles().subscribe((data: any) => {
      this.olderPosts = data;
    });
  }

  getLatestArticle() {
    this.blogService.latestArticle().subscribe((data: any) => {
      this.featured = data;
      this.getOlderArticles(data.id);
    });
  }

  getOlderArticles(current) {
    this.blogService.getArticleCollection(current).subscribe((data: any) => {
      this.articleCollection = data;
    });
  }

}
