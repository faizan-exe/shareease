export namespace BankaccountApplicationEvent {
  export namespace BankaccountCreated {
    export const key = 'bankaccount.application.bankaccount.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
