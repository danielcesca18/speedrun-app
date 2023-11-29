import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameModInterface } from '../types/game-mod.interface';

@Injectable({
  providedIn: 'root'
})
export class GameModService {

  private url = 'http://localhost:3000/game-mods';

  constructor(
    private httpClient: HttpClient
  ) {}

  getGameMods(): Observable<GameModInterface[]> {
    return this.httpClient.get<GameModInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getGameMod(id: number): Observable<GameModInterface> {
    return this.httpClient.get<GameModInterface>(`${this.url}/${id}`);
  }

  private adicionar(gameMod: GameModInterface)  {
    return this.httpClient.post(this.url, gameMod);
  }

  private atualizar(gameMod: GameModInterface) {
    return this.httpClient.put(`${this.url}/${gameMod.playerId}`, gameMod);
  }

  salvar(gameMod: GameModInterface) {
    if(gameMod.playerId) {
      return this.atualizar(gameMod);
    } else {
      return this.adicionar(gameMod);
    }
  }
}
