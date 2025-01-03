import { confirmGenerator } from "./TRV11/confirm/generator";
import { initGenerator } from "./TRV11/init/generator";
import { search1Generator } from "./TRV11/search/search1/generator";
import { search2Generator } from "./TRV11/search/search2/generator";
import { selectGenerator } from "./TRV11/select/generator";


export async function Generator(action_id: string,existingPayload: any, sessionData: any){
    switch(action_id){
        case "search1":
            return await search1Generator(existingPayload,sessionData)
        case "search2":
            return await search2Generator(existingPayload,sessionData)
        case "select":
            return await selectGenerator(existingPayload,sessionData)
        case "init":
            return await initGenerator(existingPayload,sessionData)
        case "confirm":
            return await confirmGenerator(existingPayload,sessionData)
        default:
            throw new Error(`Invalid request type ${action_id}`);
    }

}