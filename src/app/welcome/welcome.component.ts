import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  public replay;

  constructor() {

    //setTimeout(() => this.replay = true, 3000);

  }

  animating() { console.log('Animating...'); }
  animated() { console.log('Animated'); }

  log(msg) { console.log(msg); }

  test = ["aaaa", "bbbb", "cccc", "dddd", "eeeee", "ffff", "ggggg", "hhhhh", "iiiii", "lllll"]



}
