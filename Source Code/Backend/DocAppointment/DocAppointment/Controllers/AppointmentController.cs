using DAL;
using DAL.Entities;
using DocAppointment.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DocAppointment.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        AppDBContext _db;
        public AppointmentController(AppDBContext db)
        {
            _db = db;
        }


        //[HttpGet]
        //public IActionResult GetAllAppointment()
        //{
        //    var appointments = _db.Appointments
        //                    .Include(a => a.Doctor)
        //                    .ThenInclude(a => a.Appointments)
        //                    .Include(a => a.Patient)
        //                    .ThenInclude(a=> a.Appointments)
        //                    .ToList();

        //    return Ok(appointments);
        //}

        [HttpGet]
        public async Task<List<AppointmentDto>> GetAllAppointment()
        {
            return await _db.Database.SqlQuery<AppointmentDto>(
           $"EXEC GetAllAppointment").ToListAsync();

        }

        [HttpGet("{doctorId}/{status}")]
        public async Task<List<AppointmentDto>> GetAppointmentByDoctor(int doctorId,int status)
        {
             return await _db.Database.SqlQuery<AppointmentDto>(
            $"EXEC GetAppointmentsByDoctor @DoctorId = {doctorId}, @Status = {status}").ToListAsync();
            
        }

        [HttpGet("{patientId}/{status}")]
        public async Task<List<AppointmentDto>> GetAppointmentByPatient(int patientId, int status)
        {
            return await _db.Database.SqlQuery<AppointmentDto>(
           $"EXEC GetAppointmentsByPatient @PatientId = {patientId}, @Status = {status}").ToListAsync();
        }

    }
}
