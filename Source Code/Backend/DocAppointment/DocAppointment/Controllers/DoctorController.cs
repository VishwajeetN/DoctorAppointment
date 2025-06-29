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
    public class DoctorController : ControllerBase
    {
        AppDBContext _db;
        public DoctorController(AppDBContext db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task SaveDoctorScheduleAppointment([FromBody] DocotorScheduleAppointment dto)
        {
            var doctorIdParam = new SqlParameter("@DoctorId", dto.DoctorId);
            var statusParam = new SqlParameter("@Status", dto.Status);
            var dateParam = new SqlParameter("@AppointmentDate", dto.AppointmentDate);
            var fromHrParam = new SqlParameter("@FromHr", dto.FromHours);
            var froMinParam = new SqlParameter("@FromMin", dto.FromMins);
            var toHrParam = new SqlParameter("@ToHr", dto.ToHours);
            var toMinParam = new SqlParameter("@ToMin", dto.ToMins);

            await _db.Database.ExecuteSqlRawAsync(
                "EXEC InsertDoctorScheduleAppointment @DoctorId,@Status,@FromHr,@FromMin,@ToHr,@ToMin,@AppointmentDate",
                doctorIdParam,statusParam, fromHrParam, froMinParam, toHrParam, toMinParam, dateParam);
        }

        [HttpGet("{doctorId}/{status}")]
        public async Task<List<ScheduleDto>> GetAllDoctorSchedule(int doctorId, int status)
        {
            return await _db.Database.SqlQuery<ScheduleDto>(
           $"EXEC GetAllDoctorSchedule @DoctorId = {doctorId},@Status= {status}").ToListAsync();
        }

        [HttpGet()]
        public async Task<List<DoctorDto>> GetAllDoctorsList()
        {
            return await (from u in _db.Doctors
                          select new DoctorDto
                          {
                              DoctorId = u.DoctorId,
                              Name = u.Name + " - " + u.Speciality
                          }).ToListAsync();

        }

        [HttpPost("{appointmentId}/{doctorId}/{status}")]
        public async Task UpdateAppointmentByDoctor(int appointmentId, int doctorId, int status)
        {
            var appointmentIdParam = new SqlParameter("@AppointmentId", appointmentId);
            var doctorIdParam = new SqlParameter("@DoctorId", doctorId);
            var statusParam = new SqlParameter("@Status", status);

            await _db.Database.ExecuteSqlRawAsync(
                "EXEC UpdateAppointmentByDoctor @AppointmentId,@DoctorId,@Status",
               appointmentIdParam, doctorIdParam, statusParam);
        }


        [HttpPost("{scheduleId}/{doctorId}/{status}")]
        public async Task UpdateDoctorScheduleStatus(int scheduleId, int doctorId, int status)
        {
            var scheduleIdParam = new SqlParameter("@ScheduleId", scheduleId);
            var doctorIdParam = new SqlParameter("@DoctorId", doctorId);
            var statusParam = new SqlParameter("@Status", status);

            await _db.Database.ExecuteSqlRawAsync(
                "EXEC UpdateDoctorScheduleStatus @ScheduleId,@DoctorId,@Status",
               scheduleIdParam, doctorIdParam, statusParam);
        }

        [HttpGet("{scheduleId}/{doctorId}")]
        public async Task<List<EditScheduleDto>> GetDoctorSchedule(int scheduleId,int doctorId)
        {
            return await _db.Database.SqlQuery<EditScheduleDto>(
           $"EXEC GetDoctorSchedule @ScheduleId = {scheduleId}, @DoctorId = {doctorId}").ToListAsync();
        }

        [HttpPost]
        public async Task UpdateDoctorScheduleAppointment([FromBody] DocotorScheduleAppointment dto)
        {
            var scheduleIdParam = new SqlParameter("@ScheduleId", Convert.ToInt32(dto.ScheduleId));
            var doctorIdParam = new SqlParameter("@DoctorId", dto.DoctorId);
            var statusParam = new SqlParameter("@Status", dto.Status);
            var dateParam = new SqlParameter("@AppointmentDate", dto.AppointmentDate);
            var fromHrParam = new SqlParameter("@FromHr", dto.FromHours);
            var froMinParam = new SqlParameter("@FromMin", dto.FromMins);
            var toHrParam = new SqlParameter("@ToHr", dto.ToHours);
            var toMinParam = new SqlParameter("@ToMin", dto.ToMins);

            await _db.Database.ExecuteSqlRawAsync(
                "EXEC UpdateDoctorScheduleAppointment @ScheduleId, @DoctorId,@Status,@FromHr,@FromMin,@ToHr,@ToMin,@AppointmentDate",
                scheduleIdParam,doctorIdParam, statusParam, fromHrParam, froMinParam, toHrParam, toMinParam, dateParam);
        }

    }
}
