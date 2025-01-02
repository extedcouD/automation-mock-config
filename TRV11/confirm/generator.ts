
export async function confirmGenerator(existingPayload: any,sessionData: any){
    existingPayload.message.order.billing = sessionData.billing
    existingPayload.message.order.payments = sessionData.updated_payments
    existingPayload.message.order.items = sessionData.items
    return existingPayload;
}