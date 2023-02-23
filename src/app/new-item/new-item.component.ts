import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { xpenseItem } from 'src/shared/models/item-model';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent {
  addXpense(xpenseForm: NgForm) {
    // this.item = xpenseForm.value;
    // console.log(xpenseForm.value);

    let { amount, description } = xpenseForm.value;
    // console.log(amount, description);

    // this.item.amount = amount;
    // this.item.description = description;

    const xpenseItem: xpenseItem = {
      id: Math.random().toString(16).slice(2),
      description,
      amount,
    };
    console.log(xpenseItem);
    xpenseForm.reset();
  }
}
