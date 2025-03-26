namespace Boykot.Models.Db {
    public class Tag
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";

        // Relationships
        public ICollection<CompanyTag> CompanyTags { get; set; }
    }
}
