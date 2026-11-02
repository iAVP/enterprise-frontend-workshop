/** Identifies whether a transaction adds to or subtracts from the balance. */
export type TransactionType='income'|'expense';
/** Represents one income or expense entry in Personal Finance. */
export interface Transaction{id:string;type:TransactionType;description:string;amount:number;date:string;}
