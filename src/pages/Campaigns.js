import React, { useEffect, useState } from "react";
import API from "../config/api";
import { FaClone, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import moment from "moment";

const Campaigns = ({ history }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    API.get("campaign").then((res) => {
      setCampaigns(res.data);
      setLoad(false);
    });
  }, []);

  function filterName(value) {
    setSearch(value);
  }

  function deleteCampaign(e, { title, _id }) {
    e.preventDefault();
    var answer = window.confirm(
      `Are you sure you want to delete ${title} campaign?`
    );
    if (answer) {
      API.delete(`campaign/${_id}`).then((res) => {
        let newCampaings = campaigns;
        setCampaigns(newCampaings.filter((cp) => cp._id !== _id));
      });
    }
  }

  return (
    <div>
      {load ? (
        <>load...</>
      ) : (
        <>
          <div className="my-5 row ">
            <h2 className="ml-2 col-2 ">Campaigns</h2>
            <div className="form-group mx-sm-3 mb-2 col">
              <input
                onChange={(e) => filterName(e.target.value)}
                type="text"
                className="form-control "
              />
            </div>
            <button
              onClick={() => history.push("/campaigns/add")}
              className="btn btn-primary col-2"
            >
              Add new Campaign
            </button>
          </div>
          <table className="table table-bordered table-hover " border="1">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Start date</th>
                <th>End date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns
                .filter(
                  (campaignF) =>
                    campaignF.title.toLowerCase().indexOf(search) > -1
                )
                .map((campaign) => (
                  <tr key={campaign._id}>
                    <td>{campaign.title}</td>
                    <td>{campaign.description}</td>
                    <td>{moment(campaign.dateBegin).format("DD/MM/YYYY")}</td>
                    <td>{moment(campaign.dateEnd).format("DD/MM/YYYY")}</td>
                    <td className="text-center">
                      <a
                        onClick={(e) => deleteCampaign(e, campaign)}
                        href="#delete"
                      >
                        <FaTrash />
                      </a>
                      <NavLink
                        className="ml-2"
                        to={`campaigns/detail/${campaign._id}`}
                      >
                        <FaClone />
                      </NavLink>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Campaigns;
