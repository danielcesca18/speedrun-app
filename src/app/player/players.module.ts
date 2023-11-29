import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { PlayersPageRoutingModule } from './players-routing.module';

import { PlayersListaComponent } from './components/players-lista/players-lista.page';
import { PlayersCadastroComponent } from './components/players-cadastro/players-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    PlayersPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [PlayersListaComponent, PlayersCadastroComponent]
})
export class PlayersPageModule {}
