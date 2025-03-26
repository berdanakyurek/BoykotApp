namespace Boykot.Models.Response {
    public class QueryBarcodeResponse
    {
        public bool Boykot { get; set; }
        public long BarcodeNumber { get; set; }
        public string? CompanyName { get; set; }
        public List<Guid> BoykotTagIds { get; set; } = [];
    }
}
