import React from 'react'
import urls from "../../util/apiPaths.json"
import useFetch from '../../hooks/useFetch'
import classes from "./landingpage.module.css"

const LandingPage = () => {

  const { isPending, error, data } = useFetch(urls.getCustomerData)

  return (

    <>
      {!isPending && !error && (
        <div className="container">
          <table className="table table-secondary">
            <thead>
              <tr>
                <th scope="col">Customer Name</th>
                <th scope="col">Primary Phone</th>
                <th scope="col">Secondary Phone</th>
                <th scope="col">Fax</th>
                <th scope="col">Website</th>
                <th scope="col">Notes</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.customer_name}</td>
                  <td>{item.primary_phone}</td>
                  <td>{item.secondary_phone}</td>
                  <td>{item.fax}</td>
                  <td>
                    <span className={`text-truncate ${classes["my-class"]}`}>{item.website}</span>
                  </td>
                  <td>
                    <span className={`text-truncate ${classes["my-class"]}`}>{item.notes}</span>


                  </td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      )}
      {!isPending && error && <div>{error}</div>}
    </>
  )
}

export default LandingPage