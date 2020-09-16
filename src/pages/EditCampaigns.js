import React, { useEffect, useRef, useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from "moment";
import API from "../config/api";

const EditCampaigns = ({ history, match }) => {
  const refContainer = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setRangeDate] = useState([new Date(), new Date()]);
  const [showDate, setShowDate] = useState(false);
  const [campaign, setCampaign] = useState("");

  useEffect(() => {
    console.log(match.params.id);
    API.get(`campaign/${match.params.id}`).then((res) => {
      setShowDate(true);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setImagePreview(res.data.imgUrl);
      setRangeDate([res.data.dateBegin, res.data.dateEnd]);
      setCampaign(res.data);
    });
  }, []);

  function selectImage() {
    refContainer.current.click();
  }

  function loadPreview() {
    let file = refContainer.current.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setImagePreview(reader.result);
    };
  }

  function UpdateCampaign(event) {
    event.preventDefault();
    API.put(`campaign/${match.params.id}`, {
      ...campaign,
      imgUrl: imagePreview || "IMAGE url",
      title: title,
      description: description,
      dateBegin: moment(date[0]).format("YYYY-MM-DD HH:mm ZZ"),
      dateEnd: moment(date[1]).format("YYYY-MM-DD HH:mm ZZ"),
    }).then((res) => {
      history.push("/campaigns");
    });
  }

  function showDatePicker() {
    setShowDate(!showDate);
  }

  return (
    <div className="my-5">
      <h2>Let`s get started</h2>

      <form className="col-7" onSubmit={UpdateCampaign}>
        <div className="form-group mt-5">
          <label>
            1. Which hero is starring in this campaign
            <small className="form-text text-muted">
              Don`t see the hero, you want to use? Add a new hero
            </small>
          </label>

          <div onClick={() => selectImage()} id="preview">
            {imagePreview ? (
              <img alt="of campaign" src={imagePreview} />
            ) : (
              <>click to select image</>
            )}
          </div>

          <input
            type="file"
            ref={refContainer}
            accept="image/x-png,image/gif,image/jpeg"
            onChange={loadPreview}
            className="form-control d-none"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group mt-5">
          <label>2. What`s is the title of the campaign</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            required
            className="form-control"
          />
        </div>
        <div className="form-group mt-5">
          <label>3. Write a brief description of the campaign</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group mt-5 mb-5">
          <label>
            4. When will the campaign start and end ? This can be updated later
          </label>
          <div className="clearfix" />

          {showDate ? (
            <DateRangePicker onChange={setRangeDate} value={date} />
          ) : (
            <button
              onClick={showDatePicker}
              type="submit"
              className="btn btn-primary mr-3 "
            >
              Date range
            </button>
          )}
        </div>

        <button
          onClick={() => history.push("/campaigns")}
          className="btn btn-primary mr-3"
        >
          Cancel
        </button>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditCampaigns;
