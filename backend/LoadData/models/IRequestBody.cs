namespace LoadData.models
{
    public interface RequestBody
    {
        string query { get; set; }
        object variables { get; set; }
    }
}