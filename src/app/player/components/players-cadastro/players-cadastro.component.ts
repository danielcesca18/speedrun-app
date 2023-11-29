import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PlayerInterface } from '../../types/player.interface';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-players-cadastro',
  templateUrl: './players-cadastro.component.html',
  styleUrls: ['./players-cadastro.component.scss'],
})
export class PlayersCadastroComponent implements OnInit {
  playerId: number | null;
  playersForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private router: Router
  ) {
    this.playerId = null;
    this.playersForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.playerId = parseInt(id);
      this.playerService.getPlayer(this.playerId).subscribe((player) => {
        this.playersForm = this.createForm(player);
      });
    }
  }

  private createForm(player?: PlayerInterface) {
    return new FormGroup({
      username: new FormControl(player?.username || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      email: new FormControl(player?.email || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      password: new FormControl(player?.password || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
    });
  }

  salvar() {
    const player: PlayerInterface = {
      ...this.playersForm.value,
      id: this.playerId,
      lastVisit: new Date()
    };
    this.playerService.salvar(player).subscribe(
      () => this.router.navigate(['players']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o player ${player.username}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get username() {
    return this.playersForm.get('username');
  }

  get email() {
    return this.playersForm.get('email');
  }

  get password() {
    return this.playersForm.get('password');
  }
}
