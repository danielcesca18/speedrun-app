import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { RunsPageRoutingModule } from './runs-routing.module';

import { RunsListaComponent } from './components/runs-lista/runs-lista.page';
import { RunsCadastroComponent } from './components/runs-cadastro/runs-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    RunsPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [RunsListaComponent, RunsCadastroComponent]
})
export class RunsPageModule {}
