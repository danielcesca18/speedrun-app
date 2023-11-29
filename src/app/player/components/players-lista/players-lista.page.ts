import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { PlayerInterface } from '../../types/player.interface';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players-lista.page.html',
  styleUrls: ['./players-lista.page.scss'],
})
export class PlayersListaComponent
  implements OnInit, ViewWillEnter, ViewDidLeave, ViewWillLeave, ViewDidLeave
{
  players: PlayerInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private playerService: PlayerService
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
    const observable = this.playerService.getPlayers();
    observable.subscribe(
      (dados) => {
        this.players = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar os players`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  confirmarExclusao(player: PlayerInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o player ${player.username}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(player),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(player: PlayerInterface) {
    if (player.id) {
      this.playerService.excluir(player.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o player ${player.username}`,
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
