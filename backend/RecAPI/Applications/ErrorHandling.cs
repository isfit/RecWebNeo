﻿using HotChocolate;
using HotChocolate.Execution;
using Microsoft.AspNetCore.Http;
using RecAPI.AdmisionPeriodes.Repositories;
using RecAPI.Applications.Repositories;
using RecAPI.Positions.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RecAPI.Applications.ErrorHandling
{
    public class ApplicationError
    {

        public static void ValidAdmisionPeriode(IAdmisionPeriodeRepository repo, string admisionPeriodeId)
        {
            var admisionPeriode = repo.GetAdmisionPeriode(admisionPeriodeId);
            if (admisionPeriode == null)
            {
                throw new QueryException(ErrorBuilder.New().SetMessage("The admision periode does not exist.").Build());
            }
        }
        public static void ValidPositions(IPositionRepository positionRepo, IAdmisionPeriodeRepository admisionPeriodeRepo, Dictionary<int, string> positions, string admisionPeriodeId)
        {
            ValidAdmisionPeriode(admisionPeriodeRepo, admisionPeriodeId);
            var admisionPeriode = admisionPeriodeRepo.GetAdmisionPeriode(admisionPeriodeId);
            if (positions.Count() > admisionPeriode.MinAppliedPositions || positions.Count() > admisionPeriode.MaxAppliedPositions)
            {
                throw new QueryException(
                    ErrorBuilder
                    .New()
                    .SetMessage(
                        "There must be at least "
                        + admisionPeriode.MinAppliedPositions.ToString()
                        + " and at most "
                        + admisionPeriode.MaxAppliedPositions.ToString()
                        + " connected to an application"
                    ).Build());
            }
            for (int i = 0; i < positions.Count(); i++)
            {
                if (!positions.ContainsKey(i + 1))
                {
                    throw new QueryException(ErrorBuilder.New().SetMessage("The positions must be labled 1,2,3 and so forth, when requesting to reply for a position.").Build());
                }
                var position = positionRepo.GetPosition(positions[i+1]);
                if (position != null)
                {
                    if(position.AdmisionPeriode != admisionPeriodeId)
                    {
                        throw new QueryException(ErrorBuilder.New().SetMessage("A given positions is not part of the current admision periode that you are atempting to sign up for.").Build());
                    }
                }
            }
        }
    
        public static void AlreadyRegisteredApplication(IApplicationRepository applicationRepository, string userId, string admisionPeriodeId)
        {
            if(applicationRepository.CheckExistanceOfApplication(userId, admisionPeriodeId))
            {
                throw new QueryException(ErrorBuilder.New().SetMessage("There already exists an application for this user for this application periode.").Build());
            }
        }
        public static void ApplicationNotRegistered()
        {
            throw new QueryException(ErrorBuilder.New().SetMessage("The user has not registered an application for this admision periode yet.").Build());
        }
    }
}