import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { LoginServiceService } from './login-service.service';
import { LoginModule } from './login/login.module';
import { HeaderComponent } from './share/header/header.component';
import { FooterComponent } from './share/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdCardModule } from '@angular/material';
import { ThemeDirective } from './theme/theme.directive';
import { MdButtonModule } from '@angular/material';
import { MdSidenavModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    LoginModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    MdCardModule,
    MdButtonModule,
    MdSidenavModule
],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ThemeDirective
  ],
  providers: [LoginServiceService],
  bootstrap: [AppComponent],
})
export class AppModule { }

