import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GameInterface } from '../../types/game.interface';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-games-cadastro',
  templateUrl: './games-cadastro.component.html',
  styleUrls: ['./games-cadastro.component.scss'],
})
export class GamesCadastroComponent implements OnInit {
  gameId: number | null;
  gameCover: string | null;
  gamesForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) {
    this.gameId = null;
    this.gameCover = "";
    this.gamesForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.gameId = parseInt(id);
      this.gameService.getGame(this.gameId).subscribe((game) => {
        this.gamesForm = this.createForm(game);
      });
    }
  }

  private createForm(game?: GameInterface) {
    return new FormGroup({
      title: new FormControl(game?.title || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      releaseDate: new FormControl(game?.releaseDate || '', [
        Validators.required,
      ]),
    });
  }

  salvar() {
    const game: GameInterface = {
      ...this.gamesForm.value,
      id: this.gameId,
      cover: this.gameCover,
      createdAt: new Date()
    };
    this.gameService.salvar(game).subscribe(
      () => this.router.navigate(['games']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o game ${game.title}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get title() {
    return this.gamesForm.get('title');
  }

  get releaseDate() {
    return this.gamesForm.get('releaseDate');
  }

  get cover() {
    return this.gamesForm.get('cover');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      this.gameCover = file.name;
    }
  }
}
