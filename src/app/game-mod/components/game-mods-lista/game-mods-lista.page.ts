import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { GameModInterface } from '../../types/game-mod.interface';
import { GameModService } from '../../services/game-mod.service';

@Component({
  selector: 'app-game-mods',
  templateUrl: './game-mods-lista.page.html',
  styleUrls: ['./game-mods-lista.page.scss'],
})
export class GameModsListaComponent
  implements OnInit, ViewWillEnter, ViewDidLeave, ViewWillLeave, ViewDidLeave
{
  gameMods: GameModInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private gameModService: GameModService
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
    const observable = this.gameModService.getGameMods();
    observable.subscribe(
      (dados) => {
        this.gameMods = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar as game-mods`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  confirmarExclusao(gameMod: GameModInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir moderador?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(gameMod),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(gameMod: GameModInterface) {
    if (gameMod.playerId && gameMod.gameId) {
      this.gameModService.excluir(gameMod.playerId).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir moderador`,
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
