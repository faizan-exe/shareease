export namespace InvitationApplicationEvent {
  export namespace InvitationCreated {
    export const key = 'invitation.application.invitation.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
