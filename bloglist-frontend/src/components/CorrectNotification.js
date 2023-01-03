/* eslint-disable linebreak-style */
const CorrectNotification = (props) => {
  const messageStyle = {
    color: 'green',
    fontSize: 25,
    backgroundColor: '#CFCECE',
    margin: '10px 2px 30px 2px',
    border: 'solid green 3px',
    padding: '10px 10px 10px 10px',
    borderRadius: 8
  }

  if (props.message === '') {
    return null
  } else {
    return (
      <div style={messageStyle} className='correct' >
        {props.message}
      </div>
    )
  }
}


export default CorrectNotification