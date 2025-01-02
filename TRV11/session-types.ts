interface SessionData {
	transaction_id: string | null;
	message_id: string | null;
	last_action: string | null;
	mock_type: string | null;
	city_code: string | null;
	bap_id: string | null;
	bap_uri: string | null;
	bpp_id: string | null;
	bpp_uri: string | null;
	start_code: string | null;
	end_code: string | null;
	buyer_app_fee: string | null;
	vehicle_type: string | null;
	fulfillments: any[]; // Replace `any` with a specific type if known
	category_ids: string[]; // Assuming these are strings; adjust if needed
	provider_id: string | null;
	fullfillment_ids: string[]; // Assuming these are strings; adjust if needed
	item_ids: string[]; // Assuming these are strings; adjust if needed
	items: any[]; // Replace `any` with a specific type if known
	selected_item_ids: string[]; // Assuming these are strings; adjust if needed
	billing: Record<string, any>; // Replace `any` with specific types if known
	payments: any[]; // Replace `any` with a specific type if known
	order_id: string | null;
}
