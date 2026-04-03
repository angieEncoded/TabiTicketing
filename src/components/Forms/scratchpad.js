     // EDIT EXISTING RECORD
        //=================================================================================
        if (customerId) {

            if (!editingLock.status === "LOCKED") {
                toast.error("You don't seem to have an editing lock on that record.")
                setDisableEditing(true)
                setEditingLock({ status: "UNLOCKED", lockRemainingTime: 0, currentIntervalId: 0 });
                setLockPending(false)
                return;
            }


            try {
                const results = await fetch(`${urls.getCustomerById}${customerId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formPost)
                })

                if (!results.ok) { throw new Error(results.statusText) }
                const serverResponse = await results.json();

                // If we are successful
                if (serverResponse.status === "200") {

                    toast.success(`Successfully updated customer`)

                    // request the entire new record from the database
                    const savedCustomerRecord = await fetch(`${urls.getCustomerById}${customerId}`)
                    if (!savedCustomerRecord.ok) { throw new Error(savedCustomerRecord.statusText) }
                    const savedCustomerRecordJson = await savedCustomerRecord.json();




                    // Populate everything we need to for editing the customer
                    setDisableEditing(true);
                    prePopulateForm(savedCustomerRecordJson)
                    setCustomerId(customerId)
                    setFormType("edit");
                    setEditingLock({ status: "UNLOCKED", lockRemainingTime: 0 });
                    setLockPending(false)
                    setIsPending(false)

                    // update the store with the latest database information
                    const customerData = await fetch(`${urls.getCustomerData}`);
                    if (!customerData.ok) throw new Error("Failed to fetch customer data.");
                    const customerJson = await customerData.json();
                    dispatch(customersActions.loadCustomerData(customerJson));


                    return;
                } else {
                    throw new Error(serverResponse.message)
                }
            } catch (error) {
                setIsPending(false)
                toast.error(error.message)
            }
        }