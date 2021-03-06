using System;

namespace AspNetCore
{
    public class ContactRecord
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Notes { get; set; }
        public DateTime FirstEntered { get; set; }
        public DateTime LastEdited { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        
    }
}