import { Utility } from 'src/app/Utility/utility';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-btn-sidenav-animated',
  templateUrl: './btn-sidenav-animated.component.html',
  styleUrls: ['./btn-sidenav-animated.component.css']
})
export class BtnSidenavAnimatedComponent implements OnInit {

  navLinks: any[]
  activeLink = 0
  constructor(private router: Router, private route: ActivatedRoute, private utility: Utility) { }

  @Input() text: string
  @Input() btnStatus: string
  oldStatus: string = "btn-Girth"

  @Output() click = new EventEmitter<string>()
  @ViewChild('btnAnimationGirth', { static: false }) btnAnimationGirth: ElementRef
  @ViewChild('btnAnimationSkinfold', { static: false }) btnAnimationSkinfold: ElementRef
  @ViewChild('btnAnimationBody', { static: false }) btnAnimationBody: ElementRef
  @ViewChild('bckgAnimation', { static: false }) bckgAnimation: ElementRef


  color: string
  morphingGirth: string
  morphingSkinfold: string
  morphingBody: string
  initialShapeGirth: string
  initialShapeSkinfold: string
  initialShapeBody: string
  ellipseGirth = "M372.05,106.3a53.17,53.17,0,0,1-53.15,53.15H79.15a53.15,53.15,0,0,1,0-106.3H318.9A53.17,53.17,0,0,1,372.05,106.3Z"
  circleGirth = "M132.3,106.3a53.17,53.17,0,0,1-53.15,53.15h0a53.15,53.15,0,0,1,0-106.3h0A53.17,53.17,0,0,1,132.3,106.3Z"
  ellipseSkinfold = "M372.05,321.3a53.17,53.17,0,0,1-53.15,53.15H79.15a53.15,53.15,0,0,1,0-106.3H318.9A53.17,53.17,0,0,1,372.05,321.3Z"
  circleSkinfold = "M132.3,321.3a53.17,53.17,0,0,1-53.15,53.15h0a53.15,53.15,0,0,1,0-106.3h0A53.17,53.17,0,0,1,132.3,321.3Z"
  ellipseBody = "M372.05,533.9a53.17,53.17,0,0,1-53.15,53.15H79.15a53.15,53.15,0,0,1,0-106.3H318.9A53.17,53.17,0,0,1,372.05,533.9Z"
  circleBody = "M132.3,533.9a53.17,53.17,0,0,1-53.15,53.15h0a53.15,53.15,0,0,1,0-106.3h0A53.17,53.17,0,0,1,132.3,533.9Z"
  yMotion: string
  yInitialPosition: string

  onClick(btn: string) {

    this.bckgAnimation.nativeElement.beginElement()

    switch (true) {
      case btn == "btn-Girth":
        this.btnAnimationGirth.nativeElement.beginElement()
        this.morphingGirth = this.ellipseGirth + ";" + this.circleGirth;
        this.router.navigate(['./ghirthsChart'], { relativeTo: this.route })
        if (this.oldStatus == "btn-Skinfold") {
          this.btnAnimationSkinfold.nativeElement.beginElement();
          this.morphingSkinfold = this.circleSkinfold + ";" + this.ellipseSkinfold
          this.yMotion = "0,210.9; 0,0"
        };
        if (this.oldStatus == "btn-Body") {
          this.btnAnimationBody.nativeElement.beginElement();
          this.morphingBody = this.circleBody + ";" + this.ellipseBody
          this.yMotion = "0,421.8; 0,0"
        }
        break;
      case btn == "btn-Skinfold":
        this.btnAnimationSkinfold.nativeElement.beginElement()
        this.morphingSkinfold = this.ellipseSkinfold + ";" + this.circleSkinfold
        this.router.navigate(['./skinfoldsChart'], { relativeTo: this.route })
        if (this.oldStatus == "btn-Girth") {
          this.btnAnimationGirth.nativeElement.beginElement();
          this.morphingGirth = this.circleGirth + ";" + this.ellipseGirth
          this.yMotion = "0,0; 0,210.9"
        }
        if (this.oldStatus == "btn-Body") {
          this.btnAnimationBody.nativeElement.beginElement();
          this.morphingBody = this.circleBody + ";" + this.ellipseBody
          this.yMotion = "0,421.8; 0,210.9"
        }
        break;
      case btn == "btn-Body":
        this.btnAnimationBody.nativeElement.beginElement()
        this.morphingBody = this.ellipseBody + ";" + this.circleBody
        this.router.navigate(['./bodyChart'], { relativeTo: this.route })
        if (this.oldStatus == "btn-Girth") {
          this.btnAnimationGirth.nativeElement.beginElement();
          this.morphingGirth = this.circleGirth + ";" + this.ellipseGirth
          this.yMotion = "0,0; 0,421.8"
        }
        if (this.oldStatus == "btn-Skinfold") {
          this.btnAnimationSkinfold.nativeElement.beginElement();
          this.morphingSkinfold = this.circleSkinfold + ";" + this.ellipseSkinfold
          this.yMotion = "0,210.9; 0,421.8"
        }
        break;
    }
    this.click.emit(btn)
    this.oldStatus = btn
  }

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.router.navigate(['./ghirthsChart'], { relativeTo: this.route })
    this.btnStatus == "btn-Girth"
    this.initialShapeGirth = this.ellipseGirth
    this.initialShapeSkinfold = this.ellipseSkinfold
    this.initialShapeBody = this.ellipseBody
    switch (true) {
      case this.btnStatus == "btn-Girth":
        return this.initialShapeGirth = this.circleGirth,
          this.yInitialPosition = "translate(0 0)"

      case this.btnStatus == "btn-Skinfold":
        return this.initialShapeSkinfold = this.circleSkinfold,
          this.yInitialPosition = "translate(0 210.9)"

      case this.btnStatus == "btn-Body":

        return this.initialShapeBody = this.circleBody,
          this.yInitialPosition = "translate(0 428.8)"
    }
  }
}
