public class ContactManager {

    public static Contact getContact(String login) {
        if(String.isBlank(login)) return null;
        return [SELECT Id, Login__c, Password__c
                FROM Contact
                WHERE Login__c =: login
                LIMIT 1
        ];
    }

    public static Contact getContact(Id contactId) {
        if(contactId == null) return null;
        return [SELECT Id, Login__c, Password__c
                FROM Contact
                WHERE Id =: contactId
                LIMIT 1
        ];
    }
}