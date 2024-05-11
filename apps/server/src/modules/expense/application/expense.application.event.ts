export namespace ExpenseApplicationEvent {
  export namespace ExpenseCreated {
    export const key = 'expense.application.expense.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
