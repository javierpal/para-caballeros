import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';

import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

import { MainComponent } from "./pages/main/main.component";

import { PostComponent } from "./pages/post/post.component";

export const routes = [
    { path: "", component: MainComponent },
    { path: "post", component: PostComponent },
];

export const navigatableComponents = [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    PostComponent,
];