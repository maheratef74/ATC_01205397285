using System.Threading.Tasks;

namespace BusinessLogicLayer.Services.FileService;
using Microsoft.AspNetCore.Http;

public interface IFileService
{
    Task<string> UploadFile(IFormFile file);
}
