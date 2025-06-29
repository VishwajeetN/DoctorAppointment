namespace DocAppointment.DTO
{
    public class CreateAppointmentDto
    {
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public int Hours { get; set; }
        public int Mins { get; set; }
        public int Status { get; set; }

    }
}
