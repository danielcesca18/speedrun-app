import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersCadastroComponent } from './components/players-cadastro/players-cadastro.component';

import { PlayersListaComponent } from './components/players-lista/players-lista.page';

const routes: Routes = [
  {
    path: '',
    component: PlayersListaComponent
  },
  {
    path: 'cadastro',
    component: PlayersCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: PlayersCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersPageRoutingModule {}
