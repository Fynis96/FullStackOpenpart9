import {NotificationProps} from '../types'

const Notification = (props: NotificationProps) => {
  if (props.message === null || props.message === '') {
    return <div></div>
  }

  return (
    <div className='error'>
      {props.message}
    </div>
  )
}

export default Notification