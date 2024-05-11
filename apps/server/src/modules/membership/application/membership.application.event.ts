export namespace MembershipApplicationEvent {
  export namespace MembershipCreated {
    export const key = 'membership.application.membership.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
