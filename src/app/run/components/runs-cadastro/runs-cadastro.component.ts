import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RunInterface } from '../../types/run.interface';
import { RunService } from '../../services/run.service';

@Component({
  selector: 'app-runs-cadastro',
  templateUrl: './runs-cadastro.component.html',
  styleUrls: ['./runs-cadastro.component.scss'],
})
export class RunsCadastroComponent implements OnInit {
  runId: number | null;
  runsForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private runService: RunService,
    private router: Router
  ) {
    this.runId = null;
    this.runsForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.runId = parseInt(id);
      this.runService.getRun(this.runId).subscribe((run) => {
        this.runsForm = this.createForm(run);
      });
    }
  }

  private createForm(run?: RunInterface) {
    return new FormGroup({
      rta: new FormControl(run?.rta || '', [
        Validators.required,
      ]),
      gameId: new FormControl(run?.gameId || '', [
        Validators.required,
      ]),
      playerId: new FormControl(run?.playerId || '', [
        Validators.required,
      ]),
    });
  }

  salvar() {
    const run: RunInterface = {
      ...this.runsForm.value,
      id: this.runId,
      submittionDate: new Date()
    };
    this.runService.salvar(run).subscribe(
      () => this.router.navigate(['runs']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar a run`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get rta() {
    return this.runsForm.get('rta');
  }

  get gameId() {
    return this.runsForm.get('gameId');
  }

  get playerId() {
    return this.runsForm.get('playerId');
  }
}
