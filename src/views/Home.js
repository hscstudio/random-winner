import React from 'react';
import { Link } from "react-router-dom";
const Home = () => {
  const [participantCount, setParticipantCount] = React.useState(0)
  const [participants, setParticipants] = React.useState([])
  const [displayParticipant, setDisplayParticipant] = React.useState('')
  const [intervalID, setIntervalID] = React.useState(null)
  const [submited, setSubmited] = React.useState(false)
  const [winnerCount, setWinnerCount] = React.useState(1)
  const [winner, setWinner] = React.useState([])

  React.useEffect(() => {
    const jsonParticipants = localStorage.participants
    if (jsonParticipants?.length > 0){
      const storedParticipants = JSON.parse(jsonParticipants)
      setParticipantCount(storedParticipants.length)
      setParticipants(storedParticipants)
    }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    e.persist();
    setSubmited(true)
    setWinnerCount(e.target.winnerCount.value)
    const intervalID = setInterval(() => {
      const randomParticipant = Math.floor(Math.random() * participantCount);
      setDisplayParticipant(participants[randomParticipant])
    }, 30);
    setIntervalID(intervalID)
    setWinner('')
  }

  const pickWinner = (e) => {
    let winners = []
    let newParticipants = participants
    let newParticipantCount = participantCount
    for (let i = 1; i <= winnerCount; i++) {
      const winnerID = Math.floor(Math.random() * newParticipantCount);
      const winnerName = newParticipants[winnerID]
      newParticipants = newParticipants.filter(item => item !== winnerName);
      newParticipantCount = newParticipants.length
      winners.push(winnerName)
      setParticipants(newParticipants)
      setParticipantCount(newParticipantCount)

      // console.log(winnerID, winnerName, newParticipants.join(', '), newParticipantCount)
    }
    setWinner(winners)
    localStorage.participants = JSON.stringify(newParticipants)
    clearInterval(intervalID)
  }

  return (
    <div>
      {!submited &&
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label className="h4">PARTICIPANT COUNT</label>
              <div>{participantCount} participants or <Link to="/input" className="btn btn-primary btn-sm">add/edit</Link></div> 
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label className="h4">WINNER COUNT</label>
              <input style={{ width: '100px', margin: 'auto' }} type="number" placeholder="Regular" className="form-control" name="winnerCount" defaultValue="1" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-fab btn-icon btn-round" disabled={participantCount<=0}>
                <i className="ni ni-settings-gear-65"></i> START RANDOM
              </button>
            </div>
          </div>
        </div>
      </form>
      }

      {(submited && winner.length===0) &&
        <>
          <div className="h2">{displayParticipant}</div>
          <button onClick={pickWinner} type="button" className="btn btn-primary btn-fab btn-icon btn-round">
            <i className="ni ni-trophy"></i> PICK WINNER
          </button>
        </>
      }

      {(submited && winner.length>0) &&
        <>
          <div className="h2">
            Winner(s) <i className="ni ni-trophy"></i>:
          </div>
          <div className="h3" style={{ margin: '20px 0' }}>
            {winner.map((name, idx) => <div key={idx}>{idx+1}. {name} 🎉</div>)}
          </div>
          <button onClick={() => setSubmited(false) } type="button" className="btn btn-primary btn-fab btn-icon btn-round">
            PICK ANOTHER WINNER <i className="ni ni-bold-right"></i>
          </button>
        </>
      }
    </div>
  );
}

export default Home