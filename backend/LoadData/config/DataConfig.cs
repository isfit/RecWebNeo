using System;
using Newtonsoft.Json;

namespace LoadData.Config
{
    [JsonObject("data")]
    public class DataConfig
    {
        [JsonProperty("directory")]
        public string Directory { get; set; }
        [JsonProperty("textExtention")]
        public string TextExtention { get; set; }
    }

    [JsonObject("admission")]
    public class AdmissionConfig
    {
        public ConnectionProperties ConnectionProperties { get; set; }
        public OrganizationProperties OrganizationProperties { get; set; }
        public AdmisionPeriodeProperties AdmisionPeriodeProperties { get; set; }
    }

    [JsonObject("connectionProperties")]
    public class ConnectionProperties
    {
        [JsonProperty("baseUrl")]
        public string BaseUrl { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
    }

    [JsonObject("organizationProperties")]
    public class OrganizationProperties
    {
        [JsonProperty("organizationName")]
        public string OrganizationName { get; set; }

        [JsonProperty("organizationDescription")]
        public string OrganizationDescription { get; set; }
    }

    [JsonObject("admisionPeriodeProperties")]
    public class AdmisionPeriodeProperties
    {
        [JsonProperty("admisionPeriodeStartDate")]
        public string AdmisionPeriodeStartDate { get; set; }

        [JsonProperty("admisionPeriodeEndDate")]
        public string AdmisionPeriodeEndDate { get; set; }
        [JsonProperty("admisionPeriodeInterviewStart")]
        public string AdmisionPeriodeInterviewStart { get; set; }
        [JsonProperty("admisionPeriodeInterviewEnd")]
        public string AdmisionPeriodeInterviewEnd { get; set; }
        [JsonProperty("minAppliedPositions")]
        public int MinAppliedPositions { get; set; }
        [JsonProperty("maxAppliedPositions")]
        public int MaxAppliedPositions { get; set; }
    }
}
