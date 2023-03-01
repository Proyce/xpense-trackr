import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { xpenseItem } from 'src/shared/models/item-model';
import { XpenseService } from 'src/shared/services/xpense.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  netXpense!: number;
  constructor(public xpenseSrv: XpenseService){}
  sub!: Subscription;

  ngOnInit(): void {
    this.xpenseSrv.calcNetXpense()
    this.xpenseSrv.netXpense$.subscribe(val => {
      this.netXpense = val
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
