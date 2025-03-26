namespace Boykot.Models.Db
{
    public class CompanyTag
    {
        public Guid Id { get; set; }
        // Foreign keys
        public Guid CompanyId { get; set; }
        public Guid TagId { get; set; }

        // Relationships
        public Company Company { get; set; }
        public Tag Tag { get; set; }
    }
}
