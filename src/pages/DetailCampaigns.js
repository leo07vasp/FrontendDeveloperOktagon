import React, { useEffect, useState } from "react";
import API from "../config/api";
import moment from "moment";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { NavLink } from "react-router-dom";

const DetailCampaigns = ({ match }) => {
  const [campaign, setCampaign] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setRangeDate] = useState([new Date(), new Date()]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [load, setLoad] = useState(true);
  const [editMode, setEditMode] = useState("");

  useEffect(() => {
    API.get(`campaign/${match.params.id}`).then((res) => {
      setCampaign(res.data);
      setLoad(false);
    });
  }, []);

  function onOpenModal(e) {
    e.preventDefault();
    setOpen(true);
  }

  function onCloseModal() {
    setOpen(false);
  }

  function saveAction(event) {
    event.preventDefault();
    API.put(`campaign/${match.params.id}`, {
      actions: [
        ...campaign.actions,
        {
          title,
          description,
          dateBegin: date[0],
          dateEnd: date[1],
        },
      ],
    }).then((res) => {
      setTitle("");
      setDescription("");
      setRangeDate([new Date(), new Date()]);
      onCloseModal();
      setCampaign(res.data);
    });
  }

  function editAction(e, idx) {
    e.preventDefault();
    setEditMode(idx);
  }

  function updateActions() {
    API.put(`campaign/${match.params.id}`, {
      actions: [...campaign.actions],
    }).then((res) => {
      setEditMode("");
      setCampaign(res.data);
    });
  }

  function updateActionTitle(idx, value) {
    let newCampaign = { ...campaign };
    newCampaign.actions[idx].title = value;
    setCampaign(newCampaign);
  }
  function updateActionDescription(idx, value) {
    let newCampaign = { ...campaign };
    newCampaign.actions[idx].description = value;
    setCampaign(newCampaign);
  }

  return (
    <div className="mt-4 row">
      {load ? (
        <>load...</>
      ) : (
        <>
          <div className="col-9">
            <div className="mb-5 row">
              <div className="col-4">
                <h3>{campaign.title}</h3>
                <span className="clearfix" />

                <small>{`Created on ${moment(campaign.createdAt).format(
                  "DD-MM-YYYY HH:mm"
                )}`}</small>
              </div>

              <div className="col">
                <NavLink
                  className="ml-2"
                  to={`/campaigns/edit/${campaign._id}`}
                >
                  Edit
                </NavLink>
              </div>
            </div>

            <div className="mb-5">
              <b>Description</b>
              <span className="clearfix" />
              {campaign.description}
            </div>

            <div className="mb-5">
              <b>Schedule</b>
              <span className="clearfix" />

              {`${moment(campaign.dateBegin).format(
                "MMM. DD, YYYY"
              )} - ${moment(campaign.dateEnd).format("MMM. DD, YYYY")}`}
            </div>

            <div className="mb-5">
              <b>Actions</b>
              <span className="clearfix" />
              {campaign.actions ? (
                <ul>
                  {campaign.actions.map((action, idx) => (
                    <li key={idx}>
                      {editMode !== idx ? (
                        <>
                          {`${action.title} - ${action.description} `}
                          <a onClick={(e) => editAction(e, idx)} href="#edit">
                            edit
                          </a>
                        </>
                      ) : (
                        <div className="row form-inline">
                          <input
                            onChange={(e) =>
                              updateActionTitle(idx, e.target.value)
                            }
                            className="form-control m-2 col"
                            type="text"
                            value={action.title}
                          />
                          <input
                            onChange={(e) =>
                              updateActionDescription(idx, e.target.value)
                            }
                            className="form-control m-2 col"
                            type="text"
                            value={action.description}
                          />
                          <button
                            className="btn btn-primary m-2"
                            onClick={updateActions}
                          >
                            OK
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                "No actions add yet"
              )}

              <a onClick={(e) => onOpenModal(e)} className="ml-3" href="add">
                Add one
              </a>
            </div>
          </div>
          <div className="col-3 preview-detail">
            <img src={campaign.imgUrl} />
          </div>
          <Modal open={open} onClose={onCloseModal} center>
            <form onSubmit={saveAction}>
              <div className="form-group ">
                <label>Title</label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  required
                  value={title}
                  className="form-control"
                />
              </div>
              <div className="form-group ">
                <label>Description</label>
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  required
                  value={description}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <DateRangePicker
                  className="form-control"
                  onChange={setRangeDate}
                  value={date}
                />
              </div>
              <button className="btn btn-primary">Save</button>
            </form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default DetailCampaigns;
