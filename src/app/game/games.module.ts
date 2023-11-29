import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { GamesPageRoutingModule } from './games-routing.module';

import { GamesListaComponent } from './components/games-lista/games-lista.page';
import { GamesCadastroComponent } from './components/games-cadastro/games-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    GamesPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [GamesListaComponent, GamesCadastroComponent]
})
export class GamesPageModule {}
