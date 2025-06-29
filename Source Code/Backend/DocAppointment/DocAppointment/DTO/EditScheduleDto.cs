namespace DocAppointment.DTO
{
    public class EditScheduleDto
    {
        public int ScheduleId { get; set; }

        public string AppointmentDate { get; set; }

        public int FromHours { get; set; }

        public int FromMins { get; set; }

        public int ToHours { get; set; }

        public int ToMins { get; set; }

        public int Status { get; set; }

        public int DoctorId { get; set; }
    }
}
