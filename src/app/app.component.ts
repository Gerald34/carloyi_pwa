import {Component, OnInit} from '@angular/core';
import { SearchService } from './services/search.service';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router} from "@angular/router";
import { MetatagsService } from './services/metatags/metatags.service';
import { Location } from "@angular/common";
import { SeoService } from '@trilon/ng-universal';

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
      private metaService: MetatagsService,
      private location: Location,
      private seo: SeoService
  ) {
    const config = {
      title: 'Trilon SeoService Demo',
      description: 'Trilon SEO - Description',
      locale: 'en_US',
      url: 'https://trilon.io',
      type: 'website',
      msapplicationTileColor: '#000',
      themeColor: '#fff',
      og: {
        site_name: 'Trilon Consulting',
        image_url: 'https://trilon.io/meta/og-image.png'
      },
      twitter: {
        image_url: 'https://trilon.io/meta/twitter-image.png',
        summary_card: 'summary_large_image',
      },
      keywords: 'trilon, nestjs consulting, nestjs courses, node consulting, angular consulting',
      article: {
        tags: ['seo', 'trilon', 'universal'],
        section: 'trilon'
      },
      link: [
        { rel: 'alternate', type: 'application/rss+xml', title: 'RSS', href: 'https://trilon.io' },
        { rel: 'canonical', href: 'https://trilon.io/blog' }
      ],
    };

    // initialize your base Meta setup
    // (this can be done again at any point if you need to replace it entirely)
    this.seo.initializeBaseMeta(config);
    // ^^^^
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

  // refresh(): void {
  //   this.router.navigateByUrl('/article/:slug', { skipLocationChange: true }).then(() => {
  //     this.router.navigate([decodeURI(this.location.path())]);
  //   });
  // }
}
