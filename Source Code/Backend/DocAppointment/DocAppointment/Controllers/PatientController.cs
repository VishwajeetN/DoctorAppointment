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
    public class PatientController : ControllerBase
    {
        AppDBContext _db;
        public PatientController(AppDBContext db)
        {
            _db = db;
        }

        //[HttpPost("{doctorId}/{patientId}/{status}/{hours}/{mins}/{appointmentDate}")]
        //public async Task SaveAppointment(int doctorId, int patientId, int status, int hours, int mins, DateTime appointmentDate)
        //{
        //    var doctorIdParam = new SqlParameter("@DoctorId", doctorId);
        //    var patientIdParam = new SqlParameter("@PatientId", patientId);
        //    var statusParam = new SqlParameter("@Status", status);
        //    var hrParam = new SqlParameter("@Hr", hours);
        //    var minParam = new SqlParameter("@Min", mins);
        //    var dateParam = new SqlParameter("@AppointmentDate", appointmentDate);

        //    await _db.Database.ExecuteSqlRawAsync(
        //        "EXEC InsertAppointment @DoctorId, @PatientId,@Status,@Hr, @Min,@AppointmentDate",
        //        doctorIdParam, patientIdParam, statusParam, hrParam, minParam, dateParam);
        //}

        [HttpPost]
        public async Task SaveAppointmentDetails([FromBody] CreateAppointmentDto dto)
        {
            var doctorIdParam = new SqlParameter("@DoctorId", dto.DoctorId);
            var patientIdParam = new SqlParameter("@PatientId", dto.PatientId);
            var statusParam = new SqlParameter("@Status", dto.Status);
            var dateParam = new SqlParameter("@AppointmentDate", dto.AppointmentDate);
            var hrParam = new SqlParameter("@Hr", dto.Hours);
            var minParam = new SqlParameter("@Min", dto.Mins);
            

            await _db.Database.ExecuteSqlRawAsync(
                "EXEC InsertAppointment @DoctorId, @PatientId,@Status,@Hr, @Min,@AppointmentDate",
                doctorIdParam, patientIdParam, statusParam, hrParam, minParam, dateParam);
        }

    }
}
