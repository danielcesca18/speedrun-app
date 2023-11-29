import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { GameModsPageRoutingModule } from './game-mods-routing.module';

import { GameModsListaComponent } from './components/game-mods-lista/game-mods-lista.page';
import { GameModsCadastroComponent } from './components/game-mods-cadastro/game-mods-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    GameModsPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [GameModsListaComponent, GameModsCadastroComponent]
})
export class GameModsPageModule {}
