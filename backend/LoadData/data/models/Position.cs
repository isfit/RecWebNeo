using System;
using System.Collections.Generic;
using System.Text;

namespace LoadData.Data.Models
{
    class Position
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Team { get; set; }
        public string Section { get; set; }
        public Contact Contact { get; set; }
    }
}
