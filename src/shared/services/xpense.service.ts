import { BehaviorSubject, Observable } from 'rxjs';
import { xpenseItem } from '../models/item-model';

export class XpenseService {
  private selectedItemSubject: BehaviorSubject<xpenseItem> =
    new BehaviorSubject<xpenseItem>({ id: '', description: '', amount: null });

  public selectedItem$: Observable<xpenseItem> = this.selectedItemSubject.asObservable()
  constructor() {}

  initialXpenses: xpenseItem[] = [
    {
      id: Math.random().toString(16).slice(2),
      description: 'Salary',
      amount: 280000,
    },
    {
      id: Math.random().toString(16).slice(2),
      description: 'Rent',
      amount: -2800,
    },
    {
      id: Math.random().toString(16).slice(2),
      description: 'Wife Allowance',
      amount: -28000,
    },
    {
      id: Math.random().toString(16).slice(2),
      description: 'Side Hustle',
      amount: 70000,
    },
  ];

  xpenseList$: BehaviorSubject<xpenseItem[]> = new BehaviorSubject<
    xpenseItem[]
  >(this.initialXpenses);

  addXpense(amount: number, description: string) {
    const newItem: xpenseItem = {
      id: Math.random().toString(16).slice(2),
      description,
      amount,
    };
    console.log(newItem);
    // const updatedExpense = this.xpenseList$.getValue();
    // updatedExpense.push(newItem)
    const updatedExpense = [...this.xpenseList$.getValue(), newItem];
    this.xpenseList$.next(updatedExpense);
  }

  deleteExpense(index: number) {
    this.xpenseList$.getValue().splice(index, 1);
    // console.log(this.xpenseList$);
  }

  setSelectedItem(item: xpenseItem) {
    this.selectedItemSubject.next(item);
  }

  getSelectedItem() {
    // console.log(this.selectedItemSubject);
    return this.selectedItemSubject;
  }
}
