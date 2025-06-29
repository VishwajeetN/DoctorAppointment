namespace DocAppointment.DTO
{
    public class ScheduleDto
    {
        public int ScheduleId { get; set; }

        public string AppointmentDate { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public string Status { get; set; }

        public string DoctorName { get; set; }

        public string Speciality { get; set; }
       
    }
}
