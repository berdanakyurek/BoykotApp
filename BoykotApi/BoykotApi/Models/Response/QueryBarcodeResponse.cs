using Boykot.Models.DTO;

namespace Boykot.Models.Response {
    public class QueryBarcodeResponse
    {
        public bool Boykot { get; set; }
        public long BarcodeNumber { get; set; }
        public string? CompanyName { get; set; }
        public IEnumerable<TagDTO> Tags { get; set; } = [];
    }
}
