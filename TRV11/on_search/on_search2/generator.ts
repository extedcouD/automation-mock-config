
const createCustomRoute = (routeData: any[], startStationCode: string, endStationCode: string): any[] => {
    return routeData.map(route => {
        const stops = route.stops;
  
        // Find the start and end indices based on the input station codes
        const startIndex = stops.findIndex((stop: any) => stop.location.descriptor.code === startStationCode);
        const endIndex = stops.findIndex((stop: any) => stop.location.descriptor.code === endStationCode);
  
        // Check if both stations exist in the stops list
        if (startIndex === -1 || endIndex === -1) {
            throw new Error(`Start or End station not found in the route`);
        }
  
        // Ensure start and end indices are different
        if (startIndex === endIndex) {
            throw new Error(`Start and End stations must be different`);
        }
  
        // Slice and reverse if necessary
        let selectedStops: any[];
        if (startIndex > endIndex) {
            selectedStops = stops.slice(endIndex, startIndex + 1).reverse();
        } else {
            selectedStops = stops.slice(startIndex, endIndex + 1);
        }
  
        // Adjust types, parent IDs, and assign sequential IDs
        selectedStops.forEach((stop, index) => {
            stop.id = (index + 1).toString(); // Assign sequential ID starting from 1
  
            if (index === 0) {
                stop.type = "START";
                delete stop.parent_stop_id; // No parent for the first stop
            } else if (index === selectedStops.length - 1) {
                stop.type = "END";
                stop.parent_stop_id = selectedStops[index - 1].id;
            } else {
                stop.type = "INTERMEDIATE_STOP";
                stop.parent_stop_id = selectedStops[index - 1].id;
            }
        });
  
        // Construct the new route
        return {
            id: route.id,
            stops: selectedStops,
            type: route.type,
            vehicle: route.vehicle
        };
    });
  };

export async function onSearch2Generator(existingPayload: any,sessionData: any){
    // const route = stations[city_code as keyof typeof stations]
    const route = []
    const { start_code, end_code } = sessionData;
    existingPayload.fulfillments = sessionData.fulfillments = createCustomRoute(route, start_code, end_code);
    return existingPayload;
}