using Boykot.Interfaces;
using Boykot.DbContexts;
using Boykot.Models.Request;
using Boykot.Models.Response;
using Boykot.Models.Db;
using Microsoft.EntityFrameworkCore;

namespace Boykot.Services;

public class BoykotService : IBoykotService
{
    private readonly BoykotDbContext _context;

    public BoykotService(BoykotDbContext context)
    {
        _context = context;
    }

    public async Task<QueryBarcodeResponse> QueryBarcode(QueryBarcodeRequest request)
    {
        QueryBarcodeResponse response = new QueryBarcodeResponse();
        response.BarcodeNumber = request.Barcode;

        Company? company = await _context.Companies
        .Where(c => c.BarcodePrefixes.Any(bp => request.Barcode.ToString().StartsWith(bp.Prefix.ToString())))
        .Include(c => c.CompanyTags)
        .ThenInclude(ct => ct.Tag)
        .FirstOrDefaultAsync();

        if (company == null)
        {
            response.Boykot = false;
            return response;
        }

        response.CompanyName = company.Name;
        response.BoykotTagIds = company.CompanyTags
            .Select(ct => ct.TagId)
            .Intersect(request.TagIds)
            .ToList();

        if (response.BoykotTagIds.Count > 0)
            response.Boykot = true;
        else
            response.Boykot = false;

        return response;
    }

    public async Task<List<Tag>> GetTags()
    {
        return await _context.Tags.ToListAsync();
    }

}
