import { BehaviorSubject } from "rxjs";
import { xpenseItem } from "../models/item-model";


export class XpenseService {
  xpenseList$: BehaviorSubject<xpenseItem[]>  = new BehaviorSubject<xpenseItem[]>([]);

}
