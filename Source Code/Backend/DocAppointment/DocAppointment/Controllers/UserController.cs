using DAL;
using DAL.Entities;
using DocAppointment.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace DocAppointment.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        AppDBContext _db;
        public UserController(AppDBContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<int> Registration([FromBody] RegistrationDto dto)
        {
            var nameParam = new SqlParameter("@Name", dto.Name);
            var ageParam = new SqlParameter("@Age", dto.Age);
            var genderParam = new SqlParameter("@Gender", dto.Gender);
            var stateParam = new SqlParameter("@State", dto.State);
            var cityParam = new SqlParameter("@City", dto.City);
            var addressParam = new SqlParameter("@Address", dto.Address);
            var pinParam = new SqlParameter("@Pin", dto.Pin);
            var mobileParam = new SqlParameter("@Mobile", dto.Mobile);
            var userNameParam = new SqlParameter("@UserName", dto.UserName);
            var passwordParam = new SqlParameter("@Password", dto.Password);

            await _db.Database.ExecuteSqlRawAsync(
                "EXEC Registration @Name, @Age,@Gender,@State, @City,@Address, @Pin, @Mobile, @UserName, @Password",
                nameParam, ageParam, genderParam, stateParam, cityParam, addressParam, pinParam, mobileParam, userNameParam, passwordParam);

            var patientId = await _db.Patients
                            .OrderByDescending(u => u.PatientId)
                            .Select(u => u.PatientId)
                            .FirstOrDefaultAsync();

            return patientId;


        }

        //[HttpPost]
        //public async Task <IQueryable<UserDto>> Login([FromBody] LoginDto dto)
        //{
        //    //var userParam = new SqlParameter("@User", dto.User);
        //    //var userNameParam = new SqlParameter("@UserName", dto.UserName);
        //    //var passwordParam = new SqlParameter("@Password", dto.Password);

        //    //var result = await _db.Database.ExecuteSqlRawAsync(
        //    //    "EXEC GetUserDetails @User, @UserName, @Password",
        //    //    userParam, userNameParam, passwordParam);
        //    //UserDto user = result;

        //   // return user;
        //    //var patientId = await _db.Patients
        //    //                .OrderByDescending(u => u.PatientId)
        //    //                .Select(u => u.PatientId)
        //    //                .FirstOrDefaultAsync();

        //    //return patientId;

        //      IQueryable<UserDto> user =    _db.Database.SqlQuery<UserDto>(
        //    $"EXEC GetUserDetails @User = {dto.User}, @UserName = {dto.UserName}, @Password = {dto.Password}");
        //    return user;
        //}

        [HttpPost]
        public async Task<List<UserDto>> Login([FromBody] LoginDto dto)
        {
          return await _db.Database.SqlQuery<UserDto>(
          $"EXEC GetUserDetails @User = {dto.User}, @UserName = {dto.UserName}, @Password = {dto.Password}").ToListAsync();
            
        }
    }
}
