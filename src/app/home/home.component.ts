import { Component, OnInit } from '@angular/core';
import { xpenseItem } from 'src/shared/models/item-model';
import { XpenseService } from 'src/shared/services/xpense.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  editedIndex!: number;
  constructor(public xpenseSrv: XpenseService){}

  ngOnInit(): void {
  }

  editedItem(xpense: xpenseItem){
    console.log(xpense, 'edit clicked');
    // this.editedIndex = index;
  }
}
