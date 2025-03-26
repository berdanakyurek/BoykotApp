namespace Boykot.Models.Request {
    public class QueryBarcodeRequest
    {
        public long Barcode { get; set; }
        public List<Guid> TagIds { get; set; }
    }
}
