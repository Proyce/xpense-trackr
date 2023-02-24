import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators'
import { xpenseItem } from 'src/shared/models/item-model';
import { XpenseService } from 'src/shared/services/xpense.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit{


  constructor(private xpenseSrv: XpenseService){

  }
  isIncome: boolean = false;
  // xpenses$!: Observable<xpenseItem[]>;
  allItems$!: Observable<xpenseItem[]>;;
  xpenses$!: Observable<xpenseItem[]>;
  income$!: Observable<xpenseItem[]>;

  ngOnInit(): void {
    this.income$ = this.xpenseSrv.xpenseList$.pipe(
      map(xpenseArr => xpenseArr.filter(item => item.amount != null && item.amount > 0))
    )
    this.xpenses$ = this.xpenseSrv.xpenseList$.pipe(
      map(xpenseArr => xpenseArr.filter(item => item.amount != null && item.amount < 0))
    )

    this.allItems$ = this.xpenseSrv.xpenseList$;

    console.log(this.xpenses$, this.income$, this.allItems$);
  }
}
