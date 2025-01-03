import { error } from "console";
import { createContext } from "./create-context";

import fs from "fs";
import yaml from "js-yaml";
import { Generator } from "../api-factory";
function yamlToJson(filePath: string): object {
	try {
	  // Read the YAML file contents
	  const fileContents = fs.readFileSync(filePath, "utf8");
  
	  // Convert the YAML content to a JSON-compatible JavaScript object
	  const jsonData = yaml.load(fileContents);
  
	  // Return the converted JSON data
	  return jsonData;
	} catch (error) {
	  console.error(`Error reading or parsing YAML file at ${filePath}: ${error.message}`);
	  throw error;
	}
  }

function loadFactoryYaml(filePath: string): any {
	try {
	  const fileContents = fs.readFileSync(filePath, "utf8");
	  const data: any = yaml.load(fileContents) as any;
	  return data;
	} catch (error) {
	  console.error("Error reading factory YAML:", error);
	  throw error;
	}
  }
function getDetailsByActionId(actionId: string, factoryData: any): { default: string; action: string; message_id: boolean } {
	const entry = factoryData.codes.find((item) => item.action_id === actionId);
	if (entry) {
	  return {
		default: entry.default,
		action: entry.action,
		message_id: entry.message_id,
	  };
	}
	throw new error("Illegal action id found!")
	
}

export function createMockReponse(actionID: string, sessionData: any) {
	// 1. create context
	// 2. load default
	// 3. run faker
	const factoryData = loadFactoryYaml("TRV11/factory.yaml");
	const api_details = getDetailsByActionId(actionID, factoryData);
	const context_object = {
		action: api_details?.action,
		transaction_id: sessionData?.transaction_id,
		bap_id: sessionData?.bap_id,
  		bap_uri: sessionData?.bap_uri, 
  		bpp_id: sessionData?.bpp_id, 
  		bpp_uri: sessionData?.bpp_uri,
		location: {
			city: {
				code: sessionData.city_code || "std:011",
			},
			country: {
				code: "IND",
			},
		},
		message_id: api_details?.message_id ? undefined : sessionData?.message_id
	}

	const context = createContext(context_object);
	const default_message = yamlToJson(api_details.default)
	const payload = {
		context: { ...context },
		message: { ...default_message },
	  };
	// const defaults = loadDefaults("./defaults.yaml"); Replace with the actual path to your YAML file
	Generator(actionID, payload,sessionData);
}
