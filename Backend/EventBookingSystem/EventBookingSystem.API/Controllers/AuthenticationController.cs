using System.Net;
using BusinessLogicLayer.Services.ResponseService;
using BusinessLogicLayer.Services.TokenService;
using BusinessLogicLayer.Shared;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.User;
using EventBookingSystem.API.Dtos.AuthDtos;
using EventBookingSystem.API.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;

namespace EventBookingSystem.API.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IResponseService _responseService;
    private readonly IUserRepository _userRepository;
    private readonly IStringLocalizer<AuthenticationController> _localizer;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ITokenService _tokenService;
    public AuthenticationController(IResponseService responseService, IUserRepository userRepository, IStringLocalizer<AuthenticationController> localizer, UserManager<ApplicationUser> userManager, ITokenService tokenService)
    {
        _responseService = responseService;
        _userRepository = userRepository;
        _localizer = localizer;
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var existUser = await _userManager.FindByEmailAsync(request.Email);
        if (existUser != null)
        {
            return _responseService.CreateResponse(Result<string>.Failure(_localizer["EmailAlreadyExists"]));
        }
        var user = request.ToUser();

        var addResult = await _userRepository.AddAsync(user, request.Password);
        if (!addResult.Succeeded)
        {
            return _responseService.CreateResponse(Result<string>.Failure(_localizer["FailedToCreateUser"]));
        }
        
        return _responseService.CreateResponse(Result<string>.SuccessMessage(_localizer["UserCreatedSuccessfully"]));
    }
    
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
        {
            return _responseService.CreateResponse(Result<string>.Failure(_localizer["InvalidCredentials"] , HttpStatusCode.Unauthorized));
        }
        var token = await _tokenService.GenerateToken(user , request.RememberMe);

        return _responseService.CreateResponse(Result<LoginDto>.Success(user.ToLoginDto(), token));
     }
    
}