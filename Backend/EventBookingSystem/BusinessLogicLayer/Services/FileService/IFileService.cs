using System.Threading.Tasks;
using DataAccessLayer.Entities;

namespace BusinessLogicLayer.Services.FileService;
using Microsoft.AspNetCore.Http;

public interface IFileService
{
    Task<UploadedFile> UploadFile(IFormFile file);
    Task<(Stream? Stream, string ContentType, string FileName, string? ErrorKey)> GetFileAsync(string fileName);
}
