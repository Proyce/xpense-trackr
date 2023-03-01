import { BehaviorSubject, Observable } from 'rxjs';
import { xpenseItem } from '../models/item-model';

export class XpenseService {
  private selectedItemSubject: BehaviorSubject<xpenseItem> =
    new BehaviorSubject<xpenseItem>({ id: '', description: '', amount: null });

  public selectedItem$: Observable<xpenseItem> =
    this.selectedItemSubject.asObservable();

  private isEditedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isEdited$: Observable<boolean> = this.isEditedSubject.asObservable();

  private netXpenseSub: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  public netXpense$: Observable<number> = this.netXpenseSub.asObservable();

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

  calcNetXpense(){
    // this.xpenseList$.getValue().reduce((acc, curr) => acc + (curr.amount as number), 0)
    const netXpense = this.xpenseList$.getValue().reduce((acc, curr) => acc + (curr.amount ?? 0), 0)
    this.netXpenseSub.next(netXpense)
  }

  addXpense(amount: number, description: string) {
    const newItem: xpenseItem = {
      id: Math.random().toString(16).slice(2),
      description,
      amount,
    };
    // console.log(newItem);
    // const updatedExpense = this.xpenseList$.getValue();
    // updatedExpense.push(newItem)
    const updatedExpense = [...this.xpenseList$.getValue(), newItem];
    this.xpenseList$.next(updatedExpense);
    const updatedNetXpense = this.netXpenseSub.getValue() + amount;
    this.netXpenseSub.next(updatedNetXpense)
    this.calcNetXpense()
  }

  updateXpense(index: number, amount: number, description: string) {
    let editedItem: xpenseItem = this.xpenseList$.getValue()[index];
    const newItem = {
      ...editedItem,
      description,
      amount,
    };
    this.xpenseList$.getValue()[index] = newItem;
    const updatedNetXpense = this.netXpenseSub.getValue() + amount;
    this.netXpenseSub.next(updatedNetXpense);
    this.calcNetXpense()
  }

  deleteExpense(index: number) {
    this.xpenseList$.getValue().splice(index, 1);
    // console.log(this.xpenseList$);
    this.calcNetXpense();
  }

  setSelectedItem(item: xpenseItem) {
    this.selectedItemSubject.next(item);
  }

  getSelectedItem() {
    // console.log(this.selectedItemSubject);
    return this.selectedItemSubject;
  }

  setIsEdited() {
    this.isEditedSubject.next(true);
  }

  unSetIsEdited() {
    this.isEditedSubject.next(false);
  }

  setNetXpenseSub(val: number){
    this.netXpenseSub.next(val)
  }
}
