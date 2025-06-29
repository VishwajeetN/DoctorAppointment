using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class DocotorScheduleAppointment
    {
        public int ScheduleId { get; set; }

        public DateTime AppointmentDate { get; set; }

        public int FromHours { get; set; }

        public int FromMins { get; set; }

        public int ToHours { get; set; }

        public int ToMins { get; set; }

        public int Status { get; set; }

        public int DoctorId { get; set; }
    }
}
