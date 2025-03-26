namespace Boykot.Models.Db {
    public class Company
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";

        // Relationships
        public ICollection<BarcodePrefix> BarcodePrefixes { get; set; }
        public ICollection<CompanyTag> CompanyTags { get; set; }
    }
}
