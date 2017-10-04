import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontComponent } from './front.component';
import { RouterModule } from '@angular/router';
import { FrontRoutingModule } from './front-routing.module';
import { MainpageModule } from './mainpage/mainpage.module';
import { MdCardModule, MdSlideToggleModule } from '@angular/material';
import { NavComponent } from '../share/header/nav/nav.component';
import { HeaderComponent } from '../share/header/header.component';
import { FooterComponent } from '../share/footer/footer.component';
import { ThemeDirective } from '../directive/theme/theme.directive';
import { MdButtonModule } from '@angular/material';
import { MdSidenavModule } from '@angular/material';
import { MdMenuModule,MdProgressSpinnerModule } from '@angular/material'
import { MdToolbarModule }from '@angular/material';
import { BlogComponent } from './blog/blog.component'
import { MainpageComponent } from './mainpage/mainpage.component';
import { AchieveComponent } from './achieve/achieve.component'
import { ShareModule } from '../share/app-share.module';
import { AboutComponent } from './about/about.component';
import { SidebarService } from '../service/sidebar/sidebar.service';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FrontRoutingModule,
    MainpageModule,
    MdSidenavModule, 
    MdCardModule,
    MdSlideToggleModule,
    MdMenuModule ,
    MdButtonModule,
    MdToolbarModule,
    ShareModule,
    MdProgressSpinnerModule
  
],

declarations: [
  ThemeDirective,
  FrontComponent, 
  HeaderComponent, 
  FooterComponent, 
  NavComponent, BlogComponent, AchieveComponent, AboutComponent,
],
providers:[SidebarService]
})
export class FrontModule { }
