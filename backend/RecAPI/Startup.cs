using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using HotChocolate;
using HotChocolate.AspNetCore;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;

using RecAPI.Positions.Models;
using RecAPI.Positions.Repositories;
using RecAPI.Positions.Queries;
using RecAPI.Positions.Mutations;

using RecAPI.Teams.Models;
using RecAPI.Teams.Repositories;
using RecAPI.Teams.Queries;
using RecAPI.Teams.Mutations;

using RecAPI.Sections.Models;
using RecAPI.Sections.Repositories;
using RecAPI.Sections.Queries;
using RecAPI.Sections.Mutations;

using RecAPI.Organizations.Models;
using RecAPI.Organizations.Repositories;
using RecAPI.Organizations.Queries;
using RecAPI.Organizations.Mutations;

using RecAPI.Database;

namespace RecAPI
{
    public class Startup
    {

        private readonly IConfiguration Configuration;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // Database connection MongoDB
            services.Configure<RecWebDatabaseSettings>(
                Configuration.GetSection(nameof(RecWebDatabaseSettings)));

            services.AddSingleton<IRecWebDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<RecWebDatabaseSettings>>().Value);
            

            // Add repositories to service
            services.AddSingleton<IPositionRepository, PositionRepository>();
            services.AddSingleton<ITeamRepository, TeamRepository>();
            services.AddSingleton<ISectionRepository, SectionRepository>();
            services.AddSingleton<IOrganizationRepository, OrganizationRepository>();
            
            // GraphQL Schema
            services.AddGraphQL(sp => SchemaBuilder.New()
                .AddServices(sp)
                .AddQueryType(d => d.Name("Query"))
                .AddMutationType(d => d.Name("Mutation"))
                // Add Query types
                .AddType<PositionQueries>()
                .AddType<TeamQueries>()
                .AddType<SectionQueries>()
                .AddType<OrganizationQueries>()
                // Add mutations
                .AddType<PositionMutations>()
                .AddType<TeamMutations>()
                .AddType<SectionMutations>()
                .AddType<OrganizationMutations>()
                // Add Model type
                .AddType<Position>()
                .AddType<Team>()
                .AddType<Section>()
                .AddType<Organization>()
                .Create()
            );
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseGraphQL();
            app.UsePlayground();
        }
    }
}
