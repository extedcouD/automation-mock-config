

export async function onInitGenerator(existingPayload: any,sessionData: any){
    // existingPayload.fulfillments = stations[city_code as keyof typeof stations]
    const randomId = Math.random().toString(36).substring(2, 15);
    sessionData["payments"]["id"] = randomId
    sessionData["payments"]["params"] = {
    "bank_code": "XXXXXXXX",
    "bank_account_number": "xxxxxxxxxxxxxx"
  }
  if (!Array.isArray(sessionData.payments)) {
    sessionData.payments = [sessionData.payments];
    }
    existingPayload.message.order.payments = sessionData.payments
    existingPayload.message.order.items = sessionData.items
    existingPayload.message.order.fulfillments = sessionData.fulfillments
    existingPayload.message.order.quote = sessionData.quote
    return existingPayload;
}