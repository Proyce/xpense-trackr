import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { xpenseItem } from 'src/shared/models/item-model';
import { XpenseService } from 'src/shared/services/xpense.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit{
  @Input() editedIndex!: number;

  selectedItem!: xpenseItem;
  newAmount: number | null = null;
  newDesc: string = '';

  constructor(private xPenseSrv: XpenseService){
    // this.selectedItem = xPenseSrv.getSlectedItem();
    // this.newAmount = this.selectedItem.amount;
    // this.newDesc = this.selectedItem.description;
  }

  ngOnInit(): void {
    this.xPenseSrv.getSelectedItem().subscribe( item => {
      this.selectedItem = item
      this.newAmount = this.selectedItem.amount;
     this.newDesc = this.selectedItem.description;
    //  console.log(this.newAmount, this.newDesc);
    });

  }

  addXpense(xpenseForm: NgForm) {
    const { amount, description } = xpenseForm.value;
    this.xPenseSrv.addXpense(amount, description)
    xpenseForm.reset();
  }
}
