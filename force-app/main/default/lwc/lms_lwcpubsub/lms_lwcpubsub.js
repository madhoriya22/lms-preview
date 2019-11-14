import { LightningElement, track } from 'lwc';
import { createMessageContext, releaseMessageContext, publish, subscribe, unsubscribe } from "lightning/messageService";
import SAMPLEMC from "@salesforce/messageChannel/lmsPreview__c";


export default class Lms_lwcpubsub extends LightningElement {
    context = createMessageContext();
    subscription = null;
    @track receivedMessage = '';

    publishMC() {
        const message = {
            recordId: "lms:lwc:recordId",
            recordData: {value: "Publishing From LWC"}
        };
        publish(this.context, SAMPLEMC, message);
    }

    subscribeMC() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(this.context, SAMPLEMC, (message) => {
            this.handleMessage(message);
        });
     }
   
     unsubscribeMC() {
         unsubscribe(this.subscription);
         this.subscription = null;
     }
 
     handleMessage(message) {
         this.receivedMessage = message ? message.recordData.value : 'no message payload';
     }

    disconnectedCallback() {
        releaseMessageContext(this.context);
    }
}