import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RunsCadastroComponent } from './components/runs-cadastro/runs-cadastro.component';

import { RunsListaComponent } from './components/runs-lista/runs-lista.page';

const routes: Routes = [
  {
    path: '',
    component: RunsListaComponent
  },
  {
    path: 'cadastro',
    component: RunsCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: RunsCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RunsPageRoutingModule {}
