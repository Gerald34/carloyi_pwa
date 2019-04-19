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
  imagePath = this.uri.BlogImages;
  constructor(
    private blogService: BlogService,
    private uri: UriService
  ) { }

  ngOnInit() {
    this.getNews();
    this.getOlderPosts();
    this.getLatest();
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

  getLatest() {
    this.blogService.latestPost().subscribe((data: any) => {
      this.featured = data[0];
    });
  }

}
