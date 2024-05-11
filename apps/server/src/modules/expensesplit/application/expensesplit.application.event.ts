export namespace ExpensesplitApplicationEvent {
  export namespace ExpensesplitCreated {
    export const key = 'expensesplit.application.expensesplit.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
