import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// App Components
import { LandingComponent } from './landing/landing.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SigninComponent} from './signin/signin.component';
import {AffordabilityComponent} from './affordability/affordability.component';
import {RegisterComponent} from './register/register.component';
import {ShowroomComponent} from './showroom/showroom.component';
import {FooterComponent} from './footer/footer.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {TermsComponent} from './terms/terms.component';
import {WhyComponent} from './why/why.component';
import {EmailsComponent} from './emails/emails.component';
import { ChatComponent } from './chat/chat.component';
import {BookATestDriveComponent} from './book-a-test-drive/book-a-test-drive.component';
import {PasswordComponent} from './password/password.component';

/**
 * Application Routes
 * @type {({path: string; component: HomeComponent} | {path: string; component: SigninComponent} | {path: string; component: AffordabilityComponent} | {path: string; component: RegisterComponent} | {path: string; component: ShowroomComponent} | {path: string; component: ContactComponent} | {path: string; component: AboutComponent} | {path: string; component: TermsComponent} | {path: string; component: WhyComponent})[]}
 */
const routes: Routes = [
  { path: '', component: LandingComponent },
  {path: 'home', component: HomeComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'results', component: AffordabilityComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'showroom', component: ShowroomComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about', component: AboutComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'why', component: WhyComponent},
  { path: 'emails', component: EmailsComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'date', component: BookATestDriveComponent },
  { path: 'password/:token', component: PasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

export const routingComponents = [
  LandingComponent,
  HeaderComponent,
  HomeComponent,
  SigninComponent,
  AffordabilityComponent,
  RegisterComponent,
  ShowroomComponent,
  FooterComponent,
  AboutComponent,
  ContactComponent,
  TermsComponent,
  WhyComponent,
  EmailsComponent,
  ChatComponent,
  BookATestDriveComponent,
  PasswordComponent
];
