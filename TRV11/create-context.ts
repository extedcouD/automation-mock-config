export type BecknContext = {
	action: string;
	bap_id: string;
	bap_uri: string;
	bpp_id?: string;
	bpp_uri?: string;
	domain: string;
	location: {
		city: {
			code: string;
		};
		country: {
			code: string;
		};
	};
	message_id: string;
	timestamp: string;
	transaction_id: string;
	ttl: string;
	version: string;
};

export function createContext(partialContext: Partial<BecknContext>) {
	// const newContext
	// const newContext: BecknContext = {
	//     action: "search",
	//     bap_id: "bap_id_not_set",
	//     bap_uri: "bap_uri_not_set",
	//     domain: "ONDC:TRV11",
	//     location: {
	//         city: {
	//             code: "std:011"
	//         },
	//         country: {
	//             code: "IND"
	//         }
	//     },
	//     message_id:
	// }
}
