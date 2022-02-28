public class ContactService {
    
    @AuraEnabled()
    public static Contact createContact(Contact cont){
        try {
            insert cont;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

        return cont;
    }

    @AuraEnabled(cacheable = true)
    public static Contact getContact(String login){
        Contact contact = new Contact();
        try {
            contact = ContactManager.getContact(login);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

        return contact;
    }

    // public static Contact getContact(Id contactId) {
    //     Contact contact = new Contact();
    //     try {
    //         contact = ContactManager.getContact(contactId);
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }

    //     return contact;
    // }
}