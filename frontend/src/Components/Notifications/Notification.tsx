import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../../Redux/Slices/NotificationSlice';
import { DispatchType, RootState } from '../../Redux/Store';
import { NotificationData } from '../../Types/NotificationData';
import { Person } from '../../Types/Person';
import './Notification.css';
import { NotificationRow } from './NotificationRow';


export const Notification:React.FC = () => {
    // const notifications=  JSON.parse(localStorage.getItem("notifications")|| '{}');
    const p:Person=  JSON.parse(localStorage.getItem("user")|| '');
    const dispatch:DispatchType= useDispatch();
    console.log(p);
    useEffect(()=>{
    dispatch(getNotifications(p.customerId));
     } , []
    );

    const notifications = useSelector((state:RootState) => state.notify); 

    return (

<div className="notifyContaner">


{
              notifications.notifications.map((notification:NotificationData) => {
                    return <NotificationRow key={notification.id}
                    message={notification.message} id={notification.id} modifiedDate={notification.modifiedDate}/>
                })
            }
                </div>
    );
    }