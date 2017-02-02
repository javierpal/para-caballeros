import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';

import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

import { MainComponent } from "./pages/main/main.component";

export const routes = [
    { path: "", component: MainComponent },
];

export const navigatableComponents = [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
];