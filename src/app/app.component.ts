import {Component, OnInit} from '@angular/core';
import { SearchService } from './services/search.service';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router} from "@angular/router";
import { MetatagsService } from './services/metatags/metatags.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  carInformation: any;
  articleSlug: string;
  public href: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      public searchService: SearchService,
      private metaService: MetatagsService
  ) {
    // this.meta.addTag({ name: 'og:url', content: 'https://www.carloyi.com' });
    // this.meta.addTag({ name: 'author', content: 'talkingdotnet' });
    // this.meta.addTag({ name: 'keywords', content: 'Angular, Meta Service' });
  }

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
    this.route.params.subscribe(params => {
      this.articleSlug = params['slug'];
      this.featuredArticle(this.articleSlug);
    });

    this.searchService.fullCarSubject.subscribe((data: any) => {
      this.carInformation = data.carInformation[0];
    });
  }

  private featuredArticle(articleSlug) {
    this.metaService.getMetaData(articleSlug).subscribe((data: any) => {
      console.log(data);
    });
  }
}
