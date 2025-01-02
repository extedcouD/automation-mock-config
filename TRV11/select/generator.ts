const getRandomItemsWithQuantities = (items: any): any => {
    // Shuffle the array to select random items
    const shuffledItems = items.sort(() => Math.random() - 0.5);
  
    // Determine a random number of items to pick
    const randomItemCount = Math.floor(Math.random() * items.length) + 1;
  
    // Pick a random subset of items
    const selectedItems = shuffledItems.slice(0, randomItemCount);
  
    // Assign random quantities within the minimum and maximum range
    return selectedItems.map((item:any) => {
      const min = item.quantity.minimum.count;
      const max = item.quantity.maximum.count;
  
      return {
        id: item.id,
        quantity: {
          selected: {
            count: Math.floor(Math.random() * (max - min + 1)) + min, // Random number between min and max (inclusive)
          },
        },
      };
    });
  };

const transformToItemFormat = (items: any[]): any => {
    try{return items.map(item => ({
      id: item.id,
      quantity: {
        maximum: {
          count: item.quantity.maximum.count,
        },
        minimum: {
          count: item.quantity.minimum.count,
        },
      },
    }));}
      catch(e: any){
        console.log(e.message)
      }
    };
export async function selectGenerator(existingPayload: any,sessionData: any){
    const items = sessionData?.items
    const items_min_max = transformToItemFormat(items)
    const chosen_items = getRandomItemsWithQuantities(items_min_max)
    existingPayload.message.order.items = chosen_items
    sessionData.items = chosen_items
    return existingPayload;
}