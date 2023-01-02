const ErrorNotification = (props) => {
    const messageStyle = {
        color: 'red',
        fontSize: 25,
        backgroundColor: '#CFCECE',
        margin: '10px 2px 30px 2px',
        border: 'solid red 3px',
        padding: '10px 10px 10px 10px',
        borderRadius: 8
    }

    if (props.message === '') {
        return null
    } else {
        return (
            <div style={messageStyle}>
                {props.message}
            </div>
        )
    }
}

export default ErrorNotification