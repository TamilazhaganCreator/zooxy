import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskboardComponent } from './taskboard/taskboard.component';
import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  declarations: [
    AppComponent,
    TaskboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule ,
    FormsModule,
    MaterializeModule,
    DragulaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
