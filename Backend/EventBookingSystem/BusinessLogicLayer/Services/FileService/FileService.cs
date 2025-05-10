namespace BusinessLogicLayer.Services.FileService;
using Microsoft.AspNetCore.Http;

public class FileService : IFileService
{
    public async Task<string> UploadFile(IFormFile file)
    {
        string uniqueFileName = string.Empty;

        if (file is not null && file.Length > 0)
        {
            string uploadsFolder = Path.Combine( "Uploads");
            uniqueFileName = Guid.NewGuid() + "_" + file.FileName;
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create , FileAccess.Write, FileShare.None, 4096, useAsync: true))
            {
                await file.CopyToAsync(fileStream);
            }
        }
        return uniqueFileName;
    }
}