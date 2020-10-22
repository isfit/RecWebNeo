using HotChocolate;
using HotChocolate.Language;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using RecAPI.Applications.Models;
using RecAPI.Applications.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecAPI.Applications.Subscriptions
{
    [ExtendObjectType(Name = "Subscription")]
    public class ApplicationSubscription
    {
        public string OnNewApplication(
            IEventMessage message,
            [Service]IApplicationRepository repo
            )
        {
            return (string)message.Payload;
        }

    }

    public class OnNewApplicationMessage
        : EventMessage
    {
        public OnNewApplicationMessage(Application application)
            : base(CreateEventDescription(application))
        {
        }

        private static EventDescription CreateEventDescription(Application application)
        {
            return new EventDescription("onNewApplication",
                new ArgumentNode("episode",
                    new EnumValueNode(
                            application.Id
                        )));
        }
    }
}
