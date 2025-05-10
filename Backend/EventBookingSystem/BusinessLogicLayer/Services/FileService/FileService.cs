using System;
using System.IO;
using System.Threading.Tasks;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.UploadedFile;
using Microsoft.AspNetCore.Hosting;

namespace BusinessLogicLayer.Services.FileService;
using Microsoft.AspNetCore.Http;

public class FileService : IFileService
{
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly IUploadedFileRepositry _uploadedFileRepositry;
    public FileService(IWebHostEnvironment webHostEnvironment, IUploadedFileRepositry uploadedFileRepositry)
    {
        _webHostEnvironment = webHostEnvironment;
        _uploadedFileRepositry = uploadedFileRepositry;
    }

    public async Task<UploadedFile> UploadFile(IFormFile fileForm)
    {
        var fakeFileName = Path.GetRandomFileName();
        var uploadedFile = new UploadedFile
        {
            FileName = fileForm.FileName,
            ContentType = fileForm.ContentType,
            StoredFileName = fakeFileName
        };
        var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Uploads", fakeFileName);

        using FileStream fileStream = new(path, FileMode.Create);

        await fileForm.CopyToAsync(fileStream);
        return uploadedFile;
    }

    public async Task<(Stream? Stream, string ContentType, string FileName, string? ErrorKey)> GetFileAsync(string fileName)
    {
        if (fileName.Contains("..") || Path.GetFileName(fileName) != fileName)
        {
            return (null, "", "", "InvalidFileName");
        }

        var file = await _uploadedFileRepositry.GetFileByName(fileName);
        if (file == null)
        {
            return (null, "", "", "FileMetadataNotFound");
        }

        var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Uploads", file.StoredFileName);

        if (!System.IO.File.Exists(path))
        {
            return (null, "", "", "FileNotFoundOnDisk");
        }

        var stream = System.IO.File.OpenRead(path);
        return (stream, file.ContentType, file.FileName, null);
    }
}