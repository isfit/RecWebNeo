using System.Collections.Generic;
using RecAPI.Positions.Models;

namespace RecAPI.Positions.Repositories
{
    public interface IPositionRepository
    {
        IEnumerable<Position> GetPositions();
        IEnumerable<Position> GetPositions(List<string> ids);
        Position GetPosition(string id);
        Position GetPositionByName(string name);
        IEnumerable<Position> GetPositionsByAdmisionPeriode(string admisionPeriodeId);
        IEnumerable<Position> GetTeamPositions(string teamId);
        IEnumerable<Position> GetSectionPositions(string sectionId);
        Position AddPosition(Position position);
        Position UpdatePosition(string id, Position position);
        bool DeletePosition(string id);
    }
}