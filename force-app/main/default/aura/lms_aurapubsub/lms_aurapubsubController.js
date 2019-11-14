({
    handlePublish : function(component, event, helper) {
        var payload = {
            recordId: "lms:aura:record",
            recordData: {
                value: "Publishing From Aura Component"
            }
        };
        component.find("lmsPreviewChannel").publish(payload);
    },

    handleReceievedMessage : function(component, message, helper) {
        // Read the message argument to get the values in the message payload
        if (message != null && message.getParam("recordData") != null) {
            console.log(message.getParam("recordData").value);
            component.set("v.receivedMessage", message.getParam("recordData").value);
        }
    }
})