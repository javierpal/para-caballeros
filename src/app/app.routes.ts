import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';

import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

import { MainComponent } from "./pages/main/main.component";

import { PostComponent } from "./pages/post/post.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { PanelComponent } from "./pages/panel/panel.component";
import { EventosComponent } from "./pages/eventos/eventos.component";
import { CoachingComponent } from "./pages/coaching/coaching.component";

export const routes = [
    { path: "", component: MainComponent },
    { path: "post", component: PostComponent },
    { path: "eventos", component: EventosComponent},
    { path: "coaching", component: CoachingComponent},
    { path: "admin", component: AdminComponent},
    { path: "admin/panel", component: PanelComponent },
];

export const navigatableComponents = [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    PostComponent,
    AdminComponent,
    PanelComponent,
    EventosComponent,
    CoachingComponent,
];