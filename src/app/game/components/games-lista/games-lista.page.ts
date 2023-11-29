import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { GameInterface } from '../../types/game.interface';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games-lista.page.html',
  styleUrls: ['./games-lista.page.scss'],
})
export class GamesListaComponent
  implements OnInit, ViewWillEnter, ViewDidLeave, ViewWillLeave, ViewDidLeave
{
  games: GameInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private gameService: GameService
  ) {}

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.listar();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ngOnInit() {}

  listar() {
    const observable = this.gameService.getGames();
    observable.subscribe(
      (dados) => {
        this.games = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar os games`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  confirmarExclusao(game: GameInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o game ${game.title}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(game),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(game: GameInterface) {
    if (game.id) {
      this.gameService.excluir(game.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o game ${game.title}`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }
  }
}
