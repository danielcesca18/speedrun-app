import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'players',
    loadChildren: () =>
      import('./player/players.module').then((m) => m.PlayersPageModule),
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./game/games.module').then((m) => m.GamesPageModule),
  },
  {
    path: 'runs',
    loadChildren: () =>
      import('./run/runs.module').then((m) => m.RunsPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
