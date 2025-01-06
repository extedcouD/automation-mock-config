import { randomBytes } from "crypto";

function generateQrToken(): string {
    return randomBytes(32).toString("base64");
  }

function updateFulfillmentsWithParentInfo(fulfillments: any[]): void {
    const validTo = "2024-07-23T23:59:59.999Z";
  
    fulfillments.forEach((fulfillment) => {
      // Check if the fulfillment has a parent tag
      const parentTag = fulfillment.tags?.find(
        (tag: any) =>
          tag.descriptor?.code === "INFO" &&
          tag.list?.some(
            (item: any) => item.descriptor?.code === "PARENT_ID"
          )
      );
  
      if (parentTag) {
        // Generate a random QR token
        const qrToken = generateQrToken();
  
        // Add the stops object
        fulfillment.stops = [
          {
            type: "START",
            authorization: {
              type: "QR",
              token: qrToken,
              valid_to: validTo,
              status: "UNCLAIMED",
            },
          },
        ];
  
        // Generate a random ticket number
        const ticketNumber = Math.random().toString(36).substring(2, 10);
  
        // Add the new TICKET_INFO tag
        fulfillment.tags.push({
          descriptor: {
            code: "TICKET_INFO",
          },
          list: [
            {
              descriptor: {
                code: "NUMBER",
              },
              value: ticketNumber,
            },
          ],
        });
      }
    });
}


export async function onConfirmGenerator(existingPayload: any,sessionData: any){
    const randomId = Math.random().toString(36).substring(2, 15);
    sessionData["order_id"] = randomId
    sessionData["updated_payments"]["params"] = {
        ...sessionData["updated_payments"]["params"],
        "bank_code": "XXXXXXXX",
        "bank_account_number": "xxxxxxxxxxxxxx"
    }
    if (!Array.isArray(sessionData.updated_payments)) {
        sessionData.updated_payments = [sessionData.updated_payments];
    }
    updateFulfillmentsWithParentInfo(sessionData.fulfillments)
    existingPayload.message.order.payments = sessionData.payments
    existingPayload.message.order.items = sessionData.items
    existingPayload.message.order.fulfillments = sessionData.fulfillments
    existingPayload.message.order.quote = sessionData.quote
    existingPayload.message.order.id = sessionData.order_id
    return existingPayload;
}
