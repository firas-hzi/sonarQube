import './Notification.css';
import { NotificationData } from '../../Types/NotificationData';
export const NotificationRow:React.FC<NotificationData> = ({message,modifiedDate}) => {
const user = JSON.parse(localStorage.getItem("user")|| '{}');
console.log(user);
    return (

        <div  className= "notifyRecord">

<p>{message}</p>
<p>{ new Date(modifiedDate).toUTCString()}</p>

</div>

    )
}