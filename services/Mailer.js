const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

class Mailer {
    constructor({ subject, recipients }, content){
        sgMail.setApiKey(keys.sendGridKey);

        this.fromEmail = 'emailytestiranje@gmail.com';  // Could be dynamic or configurable
        this.subject = subject;
        this.body = content;
        this.recipients = this.formatAddresses(recipients);
    }

    formatAddresses(recipients){
        return recipients.map(({ email }) => email);
    }

    addClickTracking(){
        // Add logic here if you plan to manually handle tracking
        // Currently SendGrid automatically handles this in the modern API
    }

    async send(){
        const msg = {
            to: this.recipients,
            from: this.fromEmail,
            subject: this.subject,
            html: this.body,
            // Optionally add other properties like 'text' for plain text emails
        };

        try {
            const response = await sgMail.send(msg);
            return response;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}

module.exports = Mailer;