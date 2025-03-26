namespace Boykot.Models.Db {
    public class BarcodePrefix
    {
        public Guid Id { get; set; }
        public long Prefix { get; set; }

        // Foreign keys
        public Guid CompanyId { get; set; }

        // Relationships
        public Company Company { get; set; }
    }
}
