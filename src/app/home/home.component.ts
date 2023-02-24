import { Component, OnInit } from '@angular/core';
import { XpenseService } from 'src/shared/services/xpense.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(public xpenseSrv: XpenseService){}

  testObs: any = this.xpenseSrv.xpenseList$.getValue()

  ngOnInit(): void {
    console.log(this.testObs);
  }
}
