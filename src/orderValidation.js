function runAction(payload) {
	try {
		const { record: order, related } = payload.data;
		const [account] = related.Account;
		const isProofOfDeliveryRequired = account.ProofOfDeliveryRequired__c;
		const poNumber = order.PoNumber;
		const recordType = order.RecordTypeId;
		if (related.Account === undefined) {
			throw new Error(`This order is not associated with an account.`);
		}
		if (isProofOfDeliveryRequired === undefined) {
			throw new Error(`No access to ProofOfDeliveryRequired__c`);
		}
		if (isProofOfDeliveryRequired && !poNumber && recordType == "EDI Order") {
			throw new Error(`Please fill out the Purchase Order number before completing the order!`);
		}
		payload.data.message = `Order Validated`;
	} catch (error) {
		payload.data.error = error?.message;
	}
	return payload;
}
