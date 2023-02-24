import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { xpenseItem } from 'src/shared/models/item-model';
import { XpenseService } from 'src/shared/services/xpense.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent {
  constructor(private xPenseSrv: XpenseService){

  }
  addXpense(xpenseForm: NgForm) {
    const { amount, description } = xpenseForm.value;
    this.xPenseSrv.addXpense(amount, description)
    xpenseForm.reset();
  }
}
