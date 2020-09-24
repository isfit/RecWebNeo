using System;
using System.Collections.Generic;
using RecAPI.Organizations.Models;

namespace LoadData.Connector.Models
{
    public class Section
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Organization Organization { get; set; }
    }
}