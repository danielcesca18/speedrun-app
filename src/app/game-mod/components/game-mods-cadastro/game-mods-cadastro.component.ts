import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GameModInterface } from '../../types/game-mod.interface';
import { GameModService } from '../../services/game-mod.service';

@Component({
  selector: 'app-game-mods-cadastro',
  templateUrl: './game-mods-cadastro.component.html',
  styleUrls: ['./game-mods-cadastro.component.scss'],
})
export class GameModsCadastroComponent implements OnInit {
  gameModId: number | null;
  gameModsForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private gameModService: GameModService,
    private router: Router
  ) {
    this.gameModId = null;
    this.gameModsForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.gameModId = parseInt(id);
      this.gameModService.getGameMod(this.gameModId).subscribe((gameMod) => {
        this.gameModsForm = this.createForm(gameMod);
      });
    }
  }

  private createForm(gameMod?: GameModInterface) {
    return new FormGroup({
      gameId: new FormControl(gameMod?.gameId || '', [
        Validators.required,
      ]),
      playerId: new FormControl(gameMod?.playerId || '', [
        Validators.required,
      ]),
    });
  }

  salvar() {
    const gameMod: GameModInterface = {
      ...this.gameModsForm.value,
    };
    this.gameModService.salvar(gameMod).subscribe(
      () => this.router.navigate(['game-mods']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o moderador`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get gameId() {
    return this.gameModsForm.get('gameId');
  }

  get playerId() {
    return this.gameModsForm.get('playerId');
  }
}
