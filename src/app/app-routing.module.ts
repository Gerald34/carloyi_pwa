import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App Components
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './signin/signin.component';
import { AffordabilityComponent } from './affordability/affordability.component';
import { RegisterComponent } from './register/register.component';
import { ShowroomComponent } from './showroom/showroom.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { TermsComponent } from './terms/terms.component';
import { WhyComponent } from './why/why.component';
import { BookATestDriveComponent } from './book-a-test-drive/book-a-test-drive.component';
import { PasswordComponent } from './password/password.component';
import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './article/article.component';

/**
 * Application Routes
 */
const routes: Routes = [
  { path: '**', redirectTo: 'not-found' },
  { path: '', component: LandingComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'results', component: AffordabilityComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'showroom', component: ShowroomComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'why', component: WhyComponent },
  { path: 'date', component: BookATestDriveComponent },
  { path: 'password/:token', component: PasswordComponent },
  { path: 'news', component: NewsComponent },
  { path: 'article/:slug', component: ArticleComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})

export class AppRoutingModule {}

export const routingComponents = [
  LandingComponent,
  SigninComponent,
  AffordabilityComponent,
  RegisterComponent,
  ShowroomComponent,
  FooterComponent,
  AboutComponent,
  ContactComponent,
  TermsComponent,
  WhyComponent,
  BookATestDriveComponent,
  PasswordComponent,
  NewsComponent,
  ArticleComponent
];
