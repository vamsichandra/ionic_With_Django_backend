import {   IonButton,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonLoading,
    useIonRouter, } from "@ionic/react";
import Intro from '../components/Intro';
import React, { useEffect, useState } from 'react';
import {logInOutline,personCircleOutline} from 'ionicons/icons';
import Owl from '../assests/owl.svg';
import { Preferences } from '@capacitor/preferences';


const INTRO_KEY = 'intro-seen';
const Login: React.FC=()=>{
    const router = useIonRouter();
    const [introSeen, setIntroSeen] = useState(true);
    const [present, dismiss] = useIonLoading();

const doLogin= async(event:any)=>{
    event.preventDefault();
    await present('Logging in...');
    setTimeout(async () => {
      dismiss();
      router.push('/app', 'root');
    }, 2000);
    
}

useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === 'true');
    };
    checkStorage();
  }, []);

const finishIntro = async () => {
    setIntroSeen(true);
     Preferences.set({ key: INTRO_KEY, value: 'true' });
  };
const seeIntroAgain=()=>{
    setIntroSeen(false);
    Preferences.remove({key:INTRO_KEY});
};

    return(
        <>
        {!introSeen ? (
          <Intro onFinish={finishIntro} />
        ) : (
        <IonPage>
  <IonHeader>
<IonToolbar color="primary">
<IonTitle>
    Login Page
</IonTitle>
</IonToolbar>
</IonHeader>

<IonContent scrollY={false} className="ion-padding">
            <IonGrid fixed>
              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <div className="ion-text-center ion-padding">
                  <img src={Owl} alt="image not renderd" width="10%"/></div>
                  </IonCol>
                  </IonRow>


                  <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">


    
<IonCard>
    <IonCardContent>
        
    <form onSubmit={doLogin}>
        <IonInput fill="outline" labelPlacement="floating" label="Email" type="email">
        </IonInput>
        <IonInput className="ion-margin-top"fill="outline" labelPlacement="floating" label="Password" type="password">

        </IonInput>
        <IonButton type="submit" expand="block" className="ion-margin-top">
        Login
        <IonIcon icon={logInOutline} slot="end"/>
        </IonButton>
        <IonButton routerLink="/register" color={"secondary"}>
            Create Account
            <IonIcon icon={personCircleOutline} slot="end" />
         </IonButton>

        <IonButton onClick={seeIntroAgain} fill="clear" size="small" color={'medium'} type="button" expand="block" className="ion-margin-top">
                Watch intro again
                <IonIcon icon={personCircleOutline} slot="end" />
        </IonButton>


        </form>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
    )}
    </>
);


};
export default Login;