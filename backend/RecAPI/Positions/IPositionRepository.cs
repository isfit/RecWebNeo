using System.Collections.Generic;
using RecAPI.Positions.Models;

namespace RecAPI.Positions.Repositories
{
    public interface IPositionRepository
    {
        IEnumerable<Position> GetPositions();
        IEnumerable<Position> GetPositions(List<string> ids);
        Position GetPosition(string id);
        IEnumerable<Position> GetTeamPositions(string teamId);
        Position AddPosition(Position position);
        Position UpdatePosition(string id, Position position);
        bool DeletePosition(string id);
    }
}