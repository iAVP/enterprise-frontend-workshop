import { Injectable, computed, signal } from '@angular/core';
import type { Transaction } from '../models/transaction.model';
const STORAGE_KEY='personal-finance.transactions';
const DEMO_TRANSACTIONS:Transaction[]=[{id:'demo-01',type:'income',description:'Salary',amount:3200,date:'2026-10-01'},{id:'demo-02',type:'expense',description:'Rent',amount:1100,date:'2026-10-02'},{id:'demo-03',type:'expense',description:'Groceries',amount:86.4,date:'2026-10-03'},{id:'demo-04',type:'income',description:'Freelance work',amount:450,date:'2026-10-04'},{id:'demo-05',type:'expense',description:'Transport',amount:49,date:'2026-10-05'},{id:'demo-06',type:'expense',description:'Utilities',amount:125.7,date:'2026-10-06'},{id:'demo-07',type:'income',description:'Refund',amount:35,date:'2026-10-07'},{id:'demo-08',type:'expense',description:'Books',amount:28.9,date:'2026-10-08'},{id:'demo-09',type:'expense',description:'Restaurant',amount:42.5,date:'2026-10-09'},{id:'demo-10',type:'income',description:'Interest',amount:12.35,date:'2026-10-10'}];
/** Owns the Personal Finance transaction collection and its derived totals. */
@Injectable({providedIn:'root'})
export class TransactionStore{
 private readonly state=signal<Transaction[]>(this.loadTransactions());
 /** Exposes the current transaction collection as a read-only signal. */ readonly transactions=this.state.asReadonly();
 /** Calculates the current balance. */ readonly balance=computed(()=>this.state().reduce((sum,t)=>sum+(t.type==='income'?t.amount:-t.amount),0));
 /** Calculates total income. */ readonly totalIncome=computed(()=>this.state().filter(t=>t.type==='income').reduce((sum,t)=>sum+t.amount,0));
 /** Calculates total expenses. */ readonly totalExpense=computed(()=>this.state().filter(t=>t.type==='expense').reduce((sum,t)=>sum+t.amount,0));
 /** Adds a transaction and persists the updated collection. */ addTransaction(item:Omit<Transaction,'id'>):void{this.saveTransactions([{...item,id:crypto.randomUUID()},...this.state()]);}
 private loadTransactions():Transaction[]{if(typeof localStorage==='undefined')return DEMO_TRANSACTIONS;try{const saved=localStorage.getItem(STORAGE_KEY);if(saved===null)return DEMO_TRANSACTIONS;const parsed:unknown=JSON.parse(saved);return Array.isArray(parsed)?parsed as Transaction[]:DEMO_TRANSACTIONS;}catch{return DEMO_TRANSACTIONS;}}
 private saveTransactions(items:Transaction[]):void{this.state.set(items);try{localStorage.setItem(STORAGE_KEY,JSON.stringify(items));}catch{/* Current session remains usable without browser storage. */}}
}
