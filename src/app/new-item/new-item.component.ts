import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { xpenseItem } from 'src/shared/models/item-model';
import { XpenseService } from 'src/shared/services/xpense.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit, OnDestroy{
  editMode!: boolean;

  selectedItem!: xpenseItem;
  newAmount: number | null = null;
  newDesc: string = '';

  sub!: Subscription;

  constructor(private xPenseSrv: XpenseService){
  }

  ngOnInit(): void {
    this.xPenseSrv.getSelectedItem().subscribe( item => {
      this.selectedItem = item
      this.newAmount = this.selectedItem.amount;
     this.newDesc = this.selectedItem.description;
    });

    this.xPenseSrv.isEdited$.subscribe( item =>{
      this.editMode = item;
    })

  }

  addXpense(xpenseForm: NgForm) {
    const { amount, description } = xpenseForm.value;

    if(!this.editMode){
      this.xPenseSrv.addXpense(amount, description)
    }

    if(this.editMode){
      const index: number = this.xPenseSrv.xpenseList$.getValue().indexOf(this.selectedItem)
      console.log(index);
      this.xPenseSrv.updateXpense(index, amount, description);
      this.xPenseSrv.unSetIsEdited();
    }
    xpenseForm.reset();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
