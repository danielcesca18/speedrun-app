import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerInterface } from '../types/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private url = 'http://localhost:3000/players';

  constructor(
    private httpClient: HttpClient
  ) {}

  getPlayers(): Observable<PlayerInterface[]> {
    return this.httpClient.get<PlayerInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getPlayer(id: number): Observable<PlayerInterface> {
    return this.httpClient.get<PlayerInterface>(`${this.url}/${id}`);
  }

  private adicionar(player: PlayerInterface)  {
    return this.httpClient.post(this.url, player);
  }

  private atualizar(player: PlayerInterface) {
    return this.httpClient.put(`${this.url}/${player.id}`, player);
  }

  salvar(player: PlayerInterface) {
    if(player.id) {
      return this.atualizar(player);
    } else {
      return this.adicionar(player);
    }
  }
}
