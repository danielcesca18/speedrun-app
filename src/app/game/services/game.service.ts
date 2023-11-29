import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameInterface } from '../types/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private url = 'http://localhost:3000/games';

  constructor(
    private httpClient: HttpClient
  ) {}

  getGames(): Observable<GameInterface[]> {
    return this.httpClient.get<GameInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getGame(id: number): Observable<GameInterface> {
    return this.httpClient.get<GameInterface>(`${this.url}/${id}`);
  }

  private adicionar(game: GameInterface)  {
    return this.httpClient.post(this.url, game);
  }

  private atualizar(game: GameInterface) {
    return this.httpClient.put(`${this.url}/${game.id}`, game);
  }

  salvar(game: GameInterface) {
    if(game.id) {
      return this.atualizar(game);
    } else {
      return this.adicionar(game);
    }
  }
}
