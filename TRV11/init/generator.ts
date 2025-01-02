
export async function initGenerator(existingPayload: any,sessionData: any){
    existingPayload.message.order.billing = sessionData.billing
    existingPayload.message.order.payments = sessionData.payments
    existingPayload.message.order.items = sessionData.items
    return existingPayload;
}