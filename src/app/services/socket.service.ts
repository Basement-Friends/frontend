import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  ws: any

  onMessage: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
