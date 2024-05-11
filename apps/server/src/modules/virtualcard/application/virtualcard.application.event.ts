export namespace VirtualcardApplicationEvent {
  export namespace VirtualcardCreated {
    export const key = 'virtualcard.application.virtualcard.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
