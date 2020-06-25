import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionsBalance {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionsBalance {
    const balance = this.getBalance();
    return { transactions: this.transactions, balance };
  }

  public getBalance(): Balance {
    const definitiveBalance = this.transactions.reduce(
      (balance: Balance, transaction: Transaction) => {
        const balanceAux = balance;
        if (transaction.type === 'income') {
          balanceAux.income += transaction.value;
        } else if (transaction.type === 'outcome') {
          balanceAux.outcome += transaction.value;
        }

        return balanceAux;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    definitiveBalance.total =
      definitiveBalance.income - definitiveBalance.outcome;

    return definitiveBalance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
