import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RunInterface } from '../types/run.interface';

@Injectable({
  providedIn: 'root'
})
export class RunService {

  private url = 'http://localhost:3000/runs';

  constructor(
    private httpClient: HttpClient
  ) {}

  getRuns(): Observable<RunInterface[]> {
    return this.httpClient.get<RunInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getRun(id: number): Observable<RunInterface> {
    return this.httpClient.get<RunInterface>(`${this.url}/${id}`);
  }

  private adicionar(run: RunInterface)  {
    return this.httpClient.post(this.url, run);
  }

  private atualizar(run: RunInterface) {
    return this.httpClient.put(`${this.url}/${run.id}`, run);
  }

  salvar(run: RunInterface) {
    if(run.id) {
      return this.atualizar(run);
    } else {
      return this.adicionar(run);
    }
  }
}
