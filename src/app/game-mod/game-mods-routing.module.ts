import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameModsCadastroComponent } from './components/game-mods-cadastro/game-mods-cadastro.component';

import { GameModsListaComponent } from './components/game-mods-lista/game-mods-lista.page';

const routes: Routes = [
  {
    path: '',
    component: GameModsListaComponent
  },
  {
    path: 'cadastro',
    component: GameModsCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: GameModsCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameModsPageRoutingModule {}
