import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { FeaturesModule } from '@avans-nx-workshop/features';
import { NavComponent } from './components/ui/nav/nav.component';


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        AboutComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, {
            initialNavigation: 'enabledBlocking'
        }),
        FeaturesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
