using Boykot.Interfaces;
using Boykot.DbContexts;
using Boykot.Models.Request;
using Boykot.Models.Response;
using Boykot.Models.Db;
using Boykot.Models.DTO;
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
        response.Tags = company.CompanyTags
            .Where(ct => request.TagIds.Contains(ct.TagId))
            .Select(ct => new TagDTO { Id = ct.Tag.Id, Name = ct.Tag.Name })
            .ToList();

        if (response.Tags.Count() > 0)
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
