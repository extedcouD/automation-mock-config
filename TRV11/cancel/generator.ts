


export async function cancelGenerator(existingPayload: any,sessionData: any){
    existingPayload.message.order_id = sessionData.order_id
    existingPayload.message.cancellation_reason_id = sessionData.cancellation_reason_id
    return existingPayload;
}