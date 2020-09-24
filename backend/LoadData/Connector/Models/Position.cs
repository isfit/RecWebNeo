namespace LoadData.Connector.Models
{
    public class Position
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AdmisionPeriode { get; set; }
        public Section Section { get; set; }

        public Team Team { get; set; }
        public Contact Contact { get; set; }
    }
}