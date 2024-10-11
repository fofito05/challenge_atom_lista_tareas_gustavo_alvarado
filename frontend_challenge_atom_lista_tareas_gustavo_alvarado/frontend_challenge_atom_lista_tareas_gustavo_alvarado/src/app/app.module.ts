import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent, DialogCorrectoAgregarTarea, DialogEliminarTarea } from './pages/dashboard/dashboard.component';
import { DialogLogin, DialogLoginRegistro, LoginComponent } from './auth/login/login.component';
import { DialogActualizarEstadoTarea, DialogActualizarError } from './pages/dashboard/dashboard.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { DialogtareaComponent } from './pages/dialogtarea/dialogtarea.component';
import { DiauptareaComponent } from './pages/diauptarea/diauptarea.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DialogLogin,
    DialogLoginRegistro,
    DashboardComponent,
    DialogActualizarEstadoTarea,
    DialogActualizarError,
    DialogtareaComponent,
    DialogCorrectoAgregarTarea,
    DialogEliminarTarea,
    DiauptareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatTableModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  providers: [
    DashboardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
