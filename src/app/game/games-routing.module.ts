import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesCadastroComponent } from './components/games-cadastro/games-cadastro.component';

import { GamesListaComponent } from './components/games-lista/games-lista.page';

const routes: Routes = [
  {
    path: '',
    component: GamesListaComponent
  },
  {
    path: 'cadastro',
    component: GamesCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: GamesCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesPageRoutingModule {}
