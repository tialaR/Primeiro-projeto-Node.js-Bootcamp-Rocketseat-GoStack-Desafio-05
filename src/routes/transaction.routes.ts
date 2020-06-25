import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  return response.json(transactionsRepository.all());
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type } = request.body;

  try {
    const transactionService = new CreateTransactionService(
      transactionsRepository,
    );
    const transaction = transactionService.execute({ title, value, type });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
