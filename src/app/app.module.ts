import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {SelectButtonModule} from 'primeng/selectbutton';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { AppComponent } from './app.component';
import { BmrComponent } from './bmr/bmr.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BmrComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    SelectButtonModule,
    MessageModule,
    MessagesModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
