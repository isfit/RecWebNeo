using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace LoadData.Config
{
    class ConfigModule : Autofac.Module
    {
        private readonly string _configurationFilePath;
        private readonly string _sectionNameSuffix;

        public ConfigModule(string configurationFilePath, string sectionNameSuffix = "Settings")
        {
            _configurationFilePath = configurationFilePath;
            _sectionNameSuffix = sectionNameSuffix;
        }

        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterInstance(new ConfigReader(_configurationFilePath, _sectionNameSuffix))
                .As<IConfigReader>()
                .SingleInstance();

            var settings = Assembly.GetExecutingAssembly()
                .GetTypes()
                .Where(t => t.Name.EndsWith(_sectionNameSuffix, StringComparison.InvariantCulture))
                .ToList();

            settings.ForEach(type =>
            {
                builder.Register(c => c.Resolve<IConfigReader>().LoadSection(type))
                    .As(type)
                    .SingleInstance();
            });
        }
    }

    public static class Container
    {
        public static IContainer Initialize()
        {
            var builder = new ContainerBuilder();
            builder.RegisterModule(new ConfigModule("config.json"));

            builder.RegisterType<ReadData>().As<IReadData>();

            return builder.Build();
        }
    }
}
