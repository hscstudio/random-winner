import React from 'react';
import { Link } from "react-router-dom";

const Input = () => {
  const [submited, setSubmited] = React.useState(false)
  const [participants, setParticipants] = React.useState('')
  const [participantCount, setParticipantsCount] = React.useState(0)

  React.useEffect(() => {
    const jsonParticipants = localStorage.participants
    if (jsonParticipants?.length > 0){
      const storedParticipants = JSON.parse(jsonParticipants)
      const safeParticipants = storedParticipants.join("\n")
      setParticipants(safeParticipants)
      setParticipantsCount(storedParticipants.length)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    e.persist();
    const inputParticipants = e.target.participants.value
    const splitParticipants = inputParticipants.split("\n")
    localStorage.participants = JSON.stringify(splitParticipants)
    setParticipantsCount(splitParticipants.length)
    setSubmited(true)
  }

  const onChange = (e) => {
    setParticipants(e.target.value)
    const inputParticipants = e.target.value
    const splitParticipants = inputParticipants.split("\n")
    setParticipantsCount(splitParticipants.length)
  }

  return (
    <div>
      {submited && 
        <div className="alert alert-primary" role="alert">
          Participant have saved!
        </div>
      }
      <form onSubmit={handleSubmit}>       
        <div className="h6">ADD PARTICIPANT</div>
        <p>Each participant name should be added on a new line</p>
        <textarea name="participants" className="form-control form-control-alternative" rows="7" placeholder="Write a large text here ..." value={participants} onChange={onChange}>
        </textarea>
        <small>{participantCount} participant(s)</small>
        <br />
        <br />
        <button type="submit" className="btn btn-primary btn-fab btn-icon btn-round">
          <i className="ni ni-active-40"></i> SAVE
        </button>
        <Link to="/" className="btn btn-default"><i className="ni ni-bold-left"></i> BACK</Link>
      </form>
    </div>
  );
}

export default Input