import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { StrpieService } from './../../../auth/strpie.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-trainer-bio',
  templateUrl: './trainer-bio.component.html',
  styleUrls: ['./trainer-bio.component.css'],

})


export class TrainerBioComponent implements OnInit {

  constructor(private strpieService: StrpieService, private route: ActivatedRoute,) { }

  code : string

  ngOnInit() {

    const reuslt = this.route.snapshot.queryParamMap.get("code")
    console.log("reuslt c c  c c c c");
    console.log(reuslt);

    if (reuslt ){
      console.log("PASSO   C C C C C C  C C");

      this.code = reuslt
      console.log("FATTA   C C C C C C  C C");

    }
   }

   redir() {
    this.strpieService.trainerOAuthaccount(this.code).pipe(finalize(() => console.log("completed")))
      .subscribe(
        session => {
          console.log(session);

        },
        err => {
          console.log("Error createConnectedAccountSession", err);
        },
      )
  }


  pippo() {
    this.strpieService.trainerCreateStripeAccount().pipe(finalize(() => console.log("completed")))
      .subscribe(
        session => {
          document.location.href = session.url
        },
        err => {
          console.log("Error createConnectedAccountSession", err);
        },
      )
  }

  paga() {
    this.strpieService.startCheckoutConnectedAccount('acct_1IG0ziBQloJ2jgKR').pipe(finalize(() => console.log("completed")))
      .subscribe(
        session => {
          this.strpieService.redirectToCheckout2(session)

        },
        err => {
          console.log("Error createConnectedAccountSession", err);
        },
      )
  }




}
