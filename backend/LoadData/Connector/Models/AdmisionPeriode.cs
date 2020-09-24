using System;
using RecAPI.Organizations.Models;

namespace LoadData.Connector.Models {
    public class AdmisionPeriode
    {
        public string Id { get; set; }
        public Organization Organization { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public DateTime StartInterviewDate { get; set; }

        public DateTime EndInterviewDate { get; set; }

        public int MinAppliedPositions { get; set; }

        public int MaxAppliedPositions { get; set; }
    }

}