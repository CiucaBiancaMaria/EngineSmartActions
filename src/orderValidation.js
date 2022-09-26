function runAction(payload) {
	try {
		const { record: order, related } = payload.data;
		const [account] = related.Account;
		const isProofOfDeliveryRequired = account.ProofOfDeliveryRequired__c;
		const poNumber = order.PoNumber;
		if (!account) {
			throw new Error(`This order is not associated with an account.`);
		}

		if (isProofOfDeliveryRequired && !poNumber) {
			throw new Error(`Please fill out the Purchase Order number before completing the order!`);
		}
		payload.data.message = `Order Validated`;
	} catch (error) {
		payload.data.error = error?.message;
	}
	return payload;
}
