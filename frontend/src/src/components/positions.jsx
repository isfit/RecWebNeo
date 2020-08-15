import React from 'react';
import { useQuery, gql } from '@apollo/client';

const EXCHANGE_RATES = gql`
  query positions {
  positions {
    nodes {
      id,
      name,
      admisionPeriode {
          endDate
      }
    }
  }
}
`;
const PositionsTable = (props) => {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);
    console.log(data);
    if (data == null) {
        return (
            <div>

            </div>
        )
    }

    return(
        <div className="row mt-4">
            <div className="card w-100">
                <div className="table-responsive">
                    <table className="table card-table table-striped table-vcenter">
                        <thead className="">
                            <th className="" colSpan="2">Position</th>
                            <th className="">Expiracy date</th>
                            <th className=""></th>
                        </thead>
                        <tbody className="">
                            {
                                data.positions.nodes.map( position => {
                                    return(
                                        <PositionRow position={position} />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const PositionRow = ({position}) => {
    let bg = require('./favicon.ico');
    return(
        <tr className="">
            <td className="w-1"><span className="avatar" style={{backgroundImage: "url("+bg+")"}}></span></td>
            <td className="">{position.name}</td>
            <td className="text-nowrap"> { position.admisionPeriode.endDate } </td>
            <td className="w-0">
                <button type="button" className="btn btn-outline-success">+</button>
            </td>
        </tr>
    )
}

 
export default PositionsTable;