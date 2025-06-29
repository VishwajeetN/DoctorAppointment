
namespace DocAppointment.DTO
{
    public class AppointmentDto
    {

        public int AppointmentId { get; set; }

        public string AppointmentDate { get; set; }

        public int Hours { get; set; }

        public int Mins { get; set; }

        public string Status { get; set; }

        public string DoctorName { get; set; }

        public string Speciality { get; set; }

        public string PatientName { get; set; }

        public int Age { get; set; }
        public string Gender { get; set; }

    }
}
