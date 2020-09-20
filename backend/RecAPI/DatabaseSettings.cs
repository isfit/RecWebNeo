namespace RecAPI.Database
{
    public class RecWebDatabaseSettings : IRecWebDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string PositionCollectionName { get; set; }
        public string TeamCollectionName { get; set; }
        public string SectionCollectionName { get; set; }
        public string OrganizationCollectionName { get; set; }
        public string AdmisionPeriodeCollectionName { get; set; }
        public string AuthCollectionName { get; set; }
        public string UserCollectionName { get; set; }
        public string ApplicationCollectionName { get; set; }
        public string InterviewCollectionName { get; set; }
    }
    public interface IRecWebDatabaseSettings : IRecWebCollectionNameSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }

    public interface IRecWebCollectionNameSettings
    {
        string PositionCollectionName { get; set; }
        string TeamCollectionName { get; set; }
        string SectionCollectionName { get; set; }
        string OrganizationCollectionName { get; set; }
        string AdmisionPeriodeCollectionName { get; set; }
        string AuthCollectionName { get; set; }
        string UserCollectionName { get; set; }
        string ApplicationCollectionName { get; set; }
        string InterviewCollectionName { get; set; }
    }
}