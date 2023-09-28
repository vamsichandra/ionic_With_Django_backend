import { CreateAnimation, Gesture, GestureDetail, IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, createGesture, useIonViewDidEnter,IonAvatar,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    
    IonList,
   
    IonImg,
    IonChip, } from '@ionic/react';


import React, { useRef,useEffect, useState } from 'react';

const Tab2: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  const animationRef = useRef<CreateAnimation | null>(null);



  
  useIonViewDidEnter(() => {
    animationRef.current?.animation.play();
    
  });

  const fetchUsers = () => {
  setLoading(true);
  fetch('http://127.0.0.1:8000/get-legislative-data/')
  .then((response) => response.json())
  .then((data) => {
    setUsers(data.data);
    setLoading(false);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    setLoading(false);
  });
};

useEffect(() => {
fetchUsers();
}, []);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'Primary'}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" >
        <CreateAnimation
          ref={animationRef}
          duration={2000}
          iterations={Infinity}
          delay={1000}
          keyframes={[
            { offset: 0, transform: 'scale(1)', opacity: '1' },
            { offset: 0.5, transform: 'scale(1.5)', opacity: '0.5' },
            { offset: 1, transform: 'scale(1)', opacity: '1' },
          ]}>
          <IonButton expand="block" color={'success'} className="ion-margin">
            Check NDLegis.gov
          </IonButton>
        </CreateAnimation>

        {/* <div ref={elementRef} style={{ width: 50, height: 50, backgroundColor: 'red' }} /> */}

        <IonButton expand="full" onClick={fetchUsers} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </IonButton>
        <IonList>
          {users.map((user, index) => (
            <IonCard key={index}>
              <IonItem>
                <IonAvatar slot="start">
                  <IonImg src={user.img_src} />
                </IonAvatar>
                <IonLabel>
                  <h2>{user.name_value}</h2>
                  <p>{user.work_title_value}</p>
                </IonLabel>
                <IonChip slot="end" color="primary">
                  {user.email_value}
                </IonChip>
              </IonItem>
              <IonCardContent>
                {/* You can add additional details here */}
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      










      </IonContent>

    </IonPage>
  );
};

export default Tab2;