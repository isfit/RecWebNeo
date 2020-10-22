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

using RecAPI.AdmisionPeriodes.Models;
using RecAPI.AdmisionPeriodes.Repositories;
using RecAPI.AdmisionPeriodes.Queries;
using RecAPI.AdmisionPeriodes.Mutations;

using RecAPI.Applications.Models;
using RecAPI.Applications.Repositories;
using RecAPI.Applications.Queries;
using RecAPI.Applications.Mutations;

using RecAPI.Users.Models;
using RecAPI.Users.Repositories;
using RecAPI.Users.Queries;
using RecAPI.Users.Mutations;

using RecAPI.Auth.Repositories;
using RecAPI.Auth.Models;

using RecAPI.Interviews.Queries;
using RecAPI.Interviews.Mutations;
using RecAPI.Interviews.Repositories;
using RecAPI.Interviews.Models;

using RecAPI.Database;

using HotChocolate.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using HotChocolate.AspNetCore.Interceptors;
using System.Security.Claims;
using RecAPI.Generic;
using HotChocolate.Subscriptions;
using RecAPI.Applications.Subscriptions;

namespace RecAPI
{
    public class Startup
    {
        readonly string AllowSpecificOrigins = "_allowSpecificOrigins";
        private readonly IConfiguration Configuration;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // CORS
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });

            // Database connection MongoDB
            services.Configure<RecWebDatabaseSettings>(
                Configuration.GetSection(nameof(RecWebDatabaseSettings)));

            services.AddSingleton<IRecWebDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<RecWebDatabaseSettings>>().Value);


            //services.AddSingleton<IIdentityService, IdentityService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddHttpContextAccessor();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = true,
                    ValidateIssuer = true,
                    ValidateIssuerSigningKey = true,
                    ValidAudience = "audience",
                    ValidIssuer = "issuer",
                    RequireSignedTokens = false,
                    IssuerSigningKey =
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes("3AEC6D497DDADC59A3496BF158FDC"))
                };

                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
            });

            // https://docs.microsoft.com/en-us/archive/msdn-magazine/2017/october/cutting-edge-policy-based-authorization-in-asp-net-core
            services.AddAuthorization(x =>
            {
                x.AddPolicy("internal", builder =>
                    builder
                    .RequireAuthenticatedUser()
                    .RequireRole("internal", "teamleader", "admin", "superuser")
                );

                x.AddPolicy("teamleader", builder =>
                    builder
                    .RequireAuthenticatedUser()
                    .RequireRole("teamleader", "admin", "superuser")
                );

                x.AddPolicy("administrator", builder =>
                    builder
                        .RequireAuthenticatedUser()
                        .RequireRole("admin", "superuser")
                );

                x.AddPolicy("superuser", builder =>
                    builder
                        .RequireAuthenticatedUser()
                        .RequireRole("superuser")
                );
            });
            services.AddQueryRequestInterceptor(AuthenticationInterceptor());

            // Add repositories to service
            services.AddSingleton<IPositionRepository, PositionRepository>();
            services.AddSingleton<ITeamRepository, TeamRepository>();
            services.AddSingleton<ISectionRepository, SectionRepository>();
            services.AddSingleton<IOrganizationRepository, OrganizationRepository>();
            services.AddSingleton<IApplicationRepository, ApplicationRepository>(); 
            services.AddSingleton<IAuthRepository, AuthRepository>();
            services.AddSingleton<IUserRepository, UserRepository>();
            services.AddSingleton<IAdmisionPeriodeRepository, AdmisionPeriodeRepository>();
            services.AddSingleton<IInterviewRepository, InterviewRepository>();
            services.AddSingleton<IGenericRepository, GenericRepository>();

            services.AddInMemorySubscriptionProvider();

            // GraphQL Schema
            services.AddGraphQL(sp => SchemaBuilder.New()
                .AddServices(sp)
                .AddQueryType(d => d.Name("Query"))
                .AddMutationType(d => d.Name("Mutation"))
                .AddSubscriptionType(d => d.Name("Subscription"))
                // Add Query types
                .AddType<PositionQueries>()
                .AddType<TeamQueries>()
                .AddType<SectionQueries>()
                .AddType<OrganizationQueries>()
                .AddType<AdmisionPeriodeQueries>()
                .AddType<ApplicationQueries>()
                .AddType<UserQueries>()
                .AddType<InterviewQueries>()
                // Add mutations
                .AddType<PositionMutations>()
                .AddType<TeamMutations>()
                .AddType<SectionMutations>()
                .AddType<OrganizationMutations>()
                .AddType<AdmisionPeriodeMutations>()
                .AddType<ApplicationMutations>()
                .AddType<UserMutation>()
                .AddType<InterviewMutations>()
                .AddType<GenericMutation>()
                // Add subscriptions
                .AddType<ApplicationSubscription>()
                // Add Model type
                .AddType<Position>()
                .AddType<Team>()
                .AddType<Section>()
                .AddType<Organization>()
                .AddType<AdmisionPeriode>()
                .AddType<Application>()
                .AddType<User>()
                .AddType<InterviewConnections>()
                .AddType<Interview>()
                .AddAuthorizeDirectiveType()
                .Create()
            );

            
        }

        private static OnCreateRequestAsync AuthenticationInterceptor()
        {
            return (context, builder, token) =>
            {
                if (context.GetUser().Identity.IsAuthenticated)
                {
                    builder.SetProperty("currentUser",
                        new CurrentUser(
                            context.User.FindFirstValue(ClaimTypes.NameIdentifier),
                            context.User.Claims.Select(x => $"{x.Type} : {x.Value}").ToList()));
                }
                return Task.CompletedTask;
            };
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            // CORS
            app.UseCors();

            app.UseWebSockets();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UsePlayground();
            app.UseGraphQL();
        }
    }
}
