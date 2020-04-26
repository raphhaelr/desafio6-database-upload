import { EntityRepository, Repository } from 'typeorm';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const getIncomeTransactions = await this.find({
      where: { type: 'income' },
    });
    const getOutcomeTransactions = await this.find({
      where: { type: 'outcome' },
    });

    const incomeTotalValue = getIncomeTransactions.reduce(
      (income, transaction) => {
        return income + transaction.value;
      },
      0,
    );

    const outcomeTotalValue = getOutcomeTransactions.reduce(
      (value, transaction) => {
        return value + transaction.value;
      },
      0,
    );

    const balance = {
      income: incomeTotalValue,
      outcome: outcomeTotalValue,
      total: incomeTotalValue - outcomeTotalValue,
    };

    return balance;
  }
}

export default TransactionsRepository;
