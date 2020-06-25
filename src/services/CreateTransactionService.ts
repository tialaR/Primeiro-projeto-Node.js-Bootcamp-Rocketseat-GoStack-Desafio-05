import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Response {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Response): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type !== 'income' && type !== 'outcome') {
      throw Error('Incompatible transaction type.');
    }

    if (type === 'outcome' && value > balance.total) {
      throw Error('The amount is higher than the cash available.');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
