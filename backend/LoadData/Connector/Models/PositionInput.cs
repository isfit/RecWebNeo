using System;
using System.Collections.Generic;
using System.Text;

namespace LoadData.Connector.Models
{
    public class CreatePositionInput
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Contact Contact { get; set; }
        public string AdmisionPeriode { get; set; }
        public string Section { get; set; }
        public string Team { get; set; }
        public List<string> Tags { get; set; }

    }
}
